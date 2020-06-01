import {Module, VuexModule, Mutation} from 'vuex-module-decorators'
import {IValue} from "~/molle/interface/Value";
import {contentStore} from "~/utils/store-accessor";

@Module({name: 'content', stateFactory: true, namespaced: true})

export default class content extends VuexModule {
  pages: any = {};
  presetOutlines: any = {
    0: {name: "Headline"},
  };
  outlines: any = this.presetOutlines;
  values: any = {};//横断データ　古いデータを含む可能性あり
  valueRefs: any = [];

  @Mutation
  updatePages(firestoreQuerySnapshot: any) {
    console.log("--updatePages")
    this.pages = {};
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.pages[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
    });
  }

  @Mutation
  updateOutlines(firestoreQuerySnapshot: any) {
    this.outlines = Object.assign({}, this.presetOutlines);
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      this.outlines[firestoreQueryDocumentSnapshot.id] = firestoreQueryDocumentSnapshot.data();
    });
  }

  @Mutation
  updateValues(firestoreQuerySnapshot: any) {
    // this.values = Object.assign({}, firestoreQuerySnapshot);
    console.log("--updateValues")
    // this.values = {};
    let values = Object.assign({}, this.values);
    // let values = Object.assign({}, this.values);
    firestoreQuerySnapshot.forEach((firestoreQueryDocumentSnapshot: any) => {
      let v = firestoreQueryDocumentSnapshot.data();
      values[firestoreQueryDocumentSnapshot.id] = {
        name: v.name,
        type: v.type,
        value: v.value,
        extendsId: v.extendsId ? v.extendsId : "",
        // id: firestoreQueryDocumentSnapshot.id,
        // ref:firestoreQueryDocumentSnapshot.ref,
      };
    });
    //
    // extends tree
    // reset
    for (let key in values) {
      let item: IValue = values[key];
      item.childrenId = [];
    }
    // set
    for (let key in values) {
      let item: IValue = values[key];
      if (item.extendsId) {
        values[item.extendsId].childrenId.push(key)
      }
    }

    // todo
    // superValue
    let func = (item: IValue, _superValue: any) => {
      // console.log(item, _superValue);
      //itemのchildrenに_superValueを設定する
      if (!item.childrenId!.length) return;

      let v;//次のsuperValue
      if (item.value) {
        if (typeof item.value == "object") {
          v = Object.assign({}, _superValue);
          Object.assign(v, item.value);
        } else {
          v = item.value;
        }
      } else {
        v = _superValue;
      }
      // console.log(v);

      for (let id of item.childrenId!) {
        values[id].superValue = v;
        func(values[id], v);
      }
    };

    //拡張無しのitemからスタート
    for (let key in values) {
      let item: IValue = values[key];

      if (!item.extendsId) {
        func(item, item.value);
      }
    }

    console.log(values);
    this.values = values;
  }
}
