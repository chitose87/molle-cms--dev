<template lang="pug">
button.btn.btn-info.mx-2(
  type="button",
  @click="onExport"
) Export

</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop, Emit,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "molle-cms/src/Singleton";
import {IItemData, INodeObject, IPageData} from "molle-cms/src/interface";

@Component({
  components: {},
})
export default class PageExport extends Vue {
  @Prop() public value!: any;
  @Prop() pageId!: any;

  @Emit()
  public input(value: any) {
  }

  protected get localValue(): any {
    return this.value;
  }

  protected set localValue(value: any) {
    this.input(value);
  }

  private totalCount: number = 0;
  private loopFinishCount: number = 0;
  private obj: any = {items: {}};

  importModal: boolean = false;
  deployModal: boolean = false;
  currentCIFlow: any = {};
  schedule = {
    min: "",
    date: "",
    active: false
  }

  user = {
    email: ""
  }


  onExport() {
    Singleton.pagesRef.doc(this.pageId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
          let obj: any = {pages: {}};
          obj.pages[this.pageId] = snap.data();
          let a = document.createElement("a");
          a.href = URL.createObjectURL(
            new Blob(
              [JSON.stringify(obj)],
              {type: "text/plain"},
            ),
          );
          a.download = `pages-${new Date().toUTCString()}.json`;
          a.click();
        },
      );

    // items
    this.itemsExport();
  }

  loop(parent: any, index: number, end: any) {
    this.totalCount++;
    Singleton.itemsRef.doc(parent.value[index].id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        this.obj.items[parent.value[index].id] = snap.data();
        let itemData: any = snap.data();

        if (itemData.type == "children" && itemData.value.length > 0) {
          let count: number = 0;
          let n: number;
          for (let i in itemData.value) {
            n = Number(i);
            count++;
            this.loop(itemData, n, () => {
              count--;
              if (count == 0) {
                this.loopFinishCount++;
                end();
              }
            });
          }
        } else {
          this.loopFinishCount++;
          end();
        }
      })
  }

  itemsExport() {
    Singleton.itemsRef.doc(this.pageId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        this.obj.items[this.pageId] = snap.data();

        if (this.obj.items[this.pageId].value.length > 0) {
          let n: number;
          for (let i in this.obj.items[this.pageId].value) {
            n = Number(i);
            this.loop(this.obj.items[this.pageId], n, () => {
              if (this.totalCount === this.loopFinishCount) {
                this.itemsDownload();
              }
            });
          }
        } else {
          this.itemsDownload();
        }
      })
  }

  itemsDownload() {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob(
        [JSON.stringify(this.obj)],
        {type: "application/json"}),
    );
    a.download = `items-${new Date().toUTCString()}.json`;
    a.click();
  }


  /**
   *
   * @param e
   */
  onImport(e: Event) {
    let target = <HTMLFormElement>e.target;
    let files: FileList = target.files.files;

    if (files.length == 0) {
      alert("ファイルが選択されていません。");
      return;
    }

    if (
      !window.confirm(`
この作業は破壊的な変更です。
同一のIDの場合、既存のデータがすべて上書きされます。
重複するjsonデータを読み込む場合、優先順位に規則性はありません。
よろしいですか？`)
    ) return;

    let arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            let data = JSON.parse(e.target.result);
            let _arr = [];
            let batch = firebase.firestore().batch();
            let batchCount = 0;
            let items = data.pages || data.items;
            let ref: any = data.pages ? Singleton.pagesRef
              : data.items ? Singleton.itemsRef
                : reject();
            for (let id in items) {
              batch.set(ref.doc(id), items[id]);
              if (++batchCount >= 500) {
                _arr.push(batch.commit());
                batch = firebase.firestore().batch();
                batchCount = 0;
              }
            }
            _arr.push(batch.commit());
            Promise.all(_arr).then(resolve);
          } catch (e) {
            alert(e);
            reject();
          }
        };
        reader.readAsText(files[i]);
      }));
    }

    Promise.all(arr).then(() => {
      alert("complete")
    });
  }

  /**
   *
   */
  cleanup() {
    console.log("cleanup");

    let batch = firebase.firestore().batch();
    let batchCount = 0;

    Promise.all([
      Singleton.pagesRef.get(),
      Singleton.itemsRef.get()
    ]).then((v: any) => {
      let obj: any = {};
      v[1].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        obj[_snap.id] = 0;
      });
      v[1].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        let flag = false;
        //@ts-ignore
        if (itemData.type == "children") {
          for (let i in itemData.value) {
            let item = itemData.value[i];
            obj[item.id || item] += 1;
            // todo 参照されてるリストを作る
            if (typeof item == "string") {
              // node化
              itemData.value[i] = {id: item};
              flag = true;
            }
          }
          if (flag) {
            batch.update(Singleton.itemsRef.doc(_snap.id), "value", itemData.value);
            if (++batchCount >= 500) {
              batch.commit();
              batch = firebase.firestore().batch();
              batchCount = 0;
            }
          }
        }
      });
      v[0].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let pageData = <IPageData>_snap.data();
        //@ts-ignore
        obj[pageData.itemId] += 1;
      });

      //誰からも未参照のitemを削除
      console.log(obj)
      for (let id in obj) {
        if (obj[id] == 0) {
          console.log("delete", id);
          batch.delete(Singleton.itemsRef.doc(id));
          if (++batchCount >= 500) {
            batch.commit();
            batch = firebase.firestore().batch();
            batchCount = 0;
          }
        }
      }
      batch.commit();
      alert("完了しました。結果はconsoleを確認してください")
    })
  }

  /**
   *
   */
  sendPasswordResetEmail() {
    firebase.auth().sendPasswordResetEmail(this.user.email)
      .then((result) => {
        alert(`パスワード再設定メールをリクエストしました。メールをご確認ください`)
      })
      .catch((error) => {
        alert(error + "/" + this.user.email)
      });
  }
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
