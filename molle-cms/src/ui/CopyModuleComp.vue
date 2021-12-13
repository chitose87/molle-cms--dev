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

  private copyItem = MoUtils.ls.copyItem;

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
    let createNode = {id: Singleton.itemsRef.doc().id}
    let items: { [key: string]: IItemData } = {};

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
      loop(targetId, createNode.id, true)
    ]).then(([parentItemData]) => {
      // バリデーション
      if (!this.validation(items[createNode.id], <IItemData>parentItemData)) return;

      // 登録
      let batch = firebase.firestore().batch();
      for (let id in items) {
        batch.set(Singleton.itemsRef.doc(id), items[id]);
      }

      // 親データの更新
      if (parentItemData) {
        this.insertNode(parentItemData, createNode);
        batch.update(Singleton.itemsRef.doc(this.parentNode.id), {value: parentItemData.value});
      }
      // batchスタート
      batch.commit()
        .then(() => {
          console.log("--end")
        });
      //todo log & history
    })
  }

  /**
   * 移動（idの変更をしない）
   * */
  private move() {
    let copyItem = Object.assign({}, MoUtils.ls.copyItem);
    MoUtils.ls.copyItem.id = "";
    MoUtils.ls.copyItem.key = "";
    MoUtils.ls.copyItem.parentId = "";
    MoUtils.lsSave();

    // 移動先が切り取ったモジュールのbefore/afterだった場合（処理不要）
    if (copyItem.id == (this.beforeNode! || this.afterNode!).id) return;

    let same = this.parentNode.id == copyItem.parentId;

    Promise.all([
      Singleton.itemsRef.doc(copyItem.id).get(),
      Singleton.itemsRef.doc(this.parentNode.id).get(),
    ]).then(([snap, parentSnap]) => {
      let parentItemData = <IItemData>parentSnap.data();
      // バリデーション
      if (!this.validation(<IItemData>snap.data(), parentItemData)) return;

      //親から削除
      if (same) {
        parentItemData.value = parentItemData.value.filter((via: INodeObject) => via.id != copyItem.id);
      }

      //親へ追加
      this.insertNode(parentItemData, {id: copyItem.id!});

      //保存
      MoUtils.updateItem(this.parentNode.id, {value: parentItemData.value});

      //Source元 親データ削除
      if (!same) {
        Singleton.itemsRef.doc(copyItem.parentId)
          .get()
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) return;
            let sourceParentItemData = <IItemData>snap.data();
            console.log(sourceParentItemData, sourceParentItemData.value)
            MoUtils.updateItem(copyItem.parentId!,
              {value: sourceParentItemData.value.filter((via: INodeObject) => via.id != copyItem.id)}
            );
          })
      }
      //todo history
    });
  }

  /**
   * ブラック／ホワイトリストから挿入できるか確認
   * @private
   */
  private validation(itemData: IItemData, parentItemData: IItemData) {
    let moduleOpt = this.$molleModules[parentItemData.moduleId];
    if (moduleOpt.white) {
      if (!moduleOpt.white.includes(itemData.moduleId)) {
        alert(`${itemData.moduleId}は配置できません。`);
        return false;
      }
    } else if (moduleOpt.black) {
      if (moduleOpt.black.includes(itemData.moduleId)) {
        alert(`${itemData.moduleId}は禁止されています。`);
        return false;
      }
    }
    return true
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
