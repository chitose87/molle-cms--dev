<template lang="pug">
.copy-module-comp.bootstrap
  .text-right
    span.small.mr-2 選択中のモジュールを
    button.btn.btn-sm.btn-outline-info(type="button", @click="onClone") {{$words.copy}}
    div(v-if="copyItem.key === 'KeyC' || copyItem.key === 'KeyX'")
      hr
      span.small.mr-2 {{copyItem.id}}を
      button.btn.btn-sm.btn-outline-info(
        type="button",
        @click="onPaste",
      )
        span(v-html="copyItem.key === 'KeyC'?'Paste':'Move'")

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "../Singleton";
import {IItemData, ILogsData, INodeObject} from "../interface";
import {MoUtils} from "../MoUtils";
import BoxProfile from "../module/primitive/BoxProfile.vue";

@Component({
  components: {},
})
export default class CopyModuleComp extends Vue {
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;

  get copyItem(): any {
    return MoUtils.ls.copyItem;
  }

  onClone() {
    console.log("onClone");
    this.clone((this.beforeNode! || this.afterNode!).id);
  }

  onPaste() {
    console.log("onPaste");
    if (!MoUtils.ls.copyItem.id) return;
    switch (MoUtils.ls.copyItem.key) {
      case "KeyC":
        this.clone(MoUtils.ls.copyItem.id);
        break;
      case "KeyX":
        this.move();
        break;
    }
  }

  /**
   * クローン(idが追加される)
   * */
  private clone(targetId: string) {
    let createNode = {id: Singleton.itemsRef.doc().id};
    let items: {[key: string]: IItemData} = {};

    //targetIdからの全データを取得格納用ループ
    let loop = (id: string, nid: string, first = false) => {
      return Singleton.itemsRef.doc(id)
        .get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            if (first) alert(`${id}が存在しません`);
            return;
          }
          let itemData = items[nid] = <IItemData>snap.data();
          itemData.createTime = firebase.firestore.FieldValue.serverTimestamp();
          //
          if (itemData.type == "group" ||
            (itemData.type == "children" && itemData.value.length > 0)) {
            let arr: any[] = [];
            for (let i in itemData.value) {
              let _nid = Singleton.itemsRef.doc().id;
              arr.push(loop(itemData.value[i].id, _nid));
              itemData.value[i].id = _nid;
            }
            return Promise.all(arr);
          }
        });
    };

    // start
    Promise.all([
      //親データの取得
      Singleton.itemsRef.doc(this.parentNode.id)
        .get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) return;
          return <IItemData>snap.data();
        }),
      //ターゲットの取得＆クローンデータ
      loop(targetId, createNode.id, true),
    ]).then(([parentItemData]) => {
      if (!MoUtils.isIncludible(items[createNode.id].moduleId, parentItemData!)) {
        alert(`${items[createNode.id].moduleId}は配置できません。`);
        return;
      }

      // 登録
      let batchQue: any = [];
      for (let id in items) {
        batchQue.push({
          cmd: "set",
          ref: Singleton.itemsRef.doc(id),
          data: items[id],
        });
      }

      // 親データの更新
      if (parentItemData) {
        this.insertNode(parentItemData, createNode);
        batchQue.push({
          cmd: "update",
          ref: Singleton.itemsRef.doc(this.parentNode.id),
          data: {value: parentItemData.value},
        });
      }
      // batchスタート
      MoUtils.updateBatch(batchQue)
        .then(() => {
          console.log("--end");
        });
      //todo log & history
    });
  }

  /**
   * 移動（idの変更をしない）
   * */
  private move() {
    let copyItem = JSON.parse(JSON.stringify(MoUtils.ls.copyItem));

    Promise.all([
      Singleton.itemsRef.doc(copyItem.id).get(),
      Singleton.itemsRef.doc(this.parentNode.id).get(),
    ]).then(([snap, parentSnap]) => {
      let parentItemData = <IItemData>parentSnap.data();

      if (!MoUtils.isIncludible(snap.data()!.moduleId, parentItemData)) {
        alert(`${snap.data()!.moduleId}は配置できません。`);
        return;
      }

      //親へ追加
      this.insertNode(parentItemData, {id: copyItem.id!});

      //保存
      MoUtils.updateItem(this.parentNode.id, {value: parentItemData.value});
      MoUtils.addHistory("paste",
        this.parentNode.id,
        parentSnap.data(),
        {value: parentItemData.value},
      );

      //localStorageのクリア
      MoUtils.ls.copyItem.id = "";
      MoUtils.ls.copyItem.key = "";
      MoUtils.lsSave();

      //todo history
    });
  }

  /**
   * 子要素を追加
   * @param parentItemData
   * @param createNode
   * @private
   */
  private insertNode(parentItemData: IItemData, createNode: INodeObject) {
    parentItemData.value.some((_node: INodeObject, i: number) => {
      if (this.beforeNode && this.beforeNode!.id == _node.id) {
        parentItemData.value.splice(i, 0, createNode);
        return true;
      } else if (this.afterNode && this.afterNode!.id == _node.id) {
        parentItemData.value.splice(i + 1, 0, createNode);
        return true;
      }
    });
  }
}
</script>

<style lang="scss">
</style>
