<template lang="pug">
.copy-module-comp2.bootstrap(v-if="lsStore.isEditer && this.$route.query.hidden !== 'true'")
  button.btn.btn-sm.btn-outline-info(type="button", @click="pushCopy") submit

</template>

<script lang="ts">
import {Component, Vue, Prop} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/store";
import ModuleLoader from "../module/ModuleLoader.vue";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import {IItemData, INodeObject} from "../interface";

@Component({
  components: {},
})
export default class CopyModuleComp2 extends Vue {
  @Prop() label?: string;
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;
  lsStore = lsStore

  itemData = <IItemData>{};
  itemDataRootParent = <IItemData>{};
  itemDataGrandchild = <IItemData>{};

  private unsubscribe!: () => void;

  private updateTime = firebase.firestore.FieldValue.serverTimestamp();
  private historyNumber = 5;  //ログの最大履歴数
  private batch = firebase.firestore().batch();


  async pushCopy() {
    console.log("pushCopy()スタート")
    this.batch = firebase.firestore().batch();
    //呼び出し元から渡されたidでitemsのデータ取得（親と子）
    await this.itemsDataGet(this.parentNode.id,"1");
    let childNode!: INodeObject;
    if (this.beforeNode) childNode = this.beforeNode;
    if (this.afterNode) childNode = this.afterNode;
    await this.itemsDataGet(childNode.id,"2");

    //親のlogId生成
    let logIdRootparent = Singleton.logsRef.doc().id;
    console.log("親のlogId", logIdRootparent)

    //子のitemId生成
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};
    console.log("子のitemId", node.id)

    //items（親）のvalue、dev.log更新
    //logs（親）作成
    this.parentDataUpdate(logIdRootparent,node);

    //子の作成
    await this.copyModule(this.itemData, node.id);
    console.log("copyModuleからの戻り")

    this.batch.commit();
    console.log("batchコミット時のnode",node)
    lsStore.update({key: "focusModuleNode", value: node});

  }

  async itemsDataGet(itemId:string,paramflag:string) {
    return new Promise(resolve => {
      Singleton.itemsRef.doc(itemId)
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if(paramflag === "1"){
            this.$set(this, "itemDataRootParent", snap.data());
            console.log("itemDataRootParentの取得", this.itemDataRootParent)
            resolve();
          }else if(paramflag === "2") {
            this.$set(this, "itemData", snap.data());
            console.log("itemDataの取得",this.itemData)
            resolve();
          }else {
            this.$set(this, "itemDataGrandchild", snap.data());
            console.log("itemDataGrandchildの取得",this.itemDataGrandchild)
            resolve();
          }
      });
    })
  }

  async parentDataUpdate(logIdRootparent:string,node:any) {
    //親のitems　value更新
    console.log("親のvalue更新前", this.itemDataRootParent.value)
    if (!this.itemDataRootParent.value) this.itemDataRootParent.value = [];
    if (this.beforeNode) {
      this.itemDataRootParent.value.some((_node: INodeObject, i: number) => {
        if (this.beforeNode!.id == _node.id) {
          this.itemDataRootParent.value.splice(i, 0, node);
          return true;
        }
      })
    } else if (this.afterNode) {
      this.itemDataRootParent.value.some((_node: INodeObject, i: number) => {
        if (this.afterNode!.id == _node.id) {
          this.itemDataRootParent.value.splice(i + 1, 0, node);
          return true;
        }
      })
    } else {
      this.itemDataRootParent.value.push(node);
    }
    console.log("親のvalue更新後", this.itemDataRootParent.value)

    //親のitems　dev.log更新
    if (!this.itemDataRootParent.dev) this.itemDataRootParent.dev = {};
    if (!this.itemDataRootParent.dev.log) this.itemDataRootParent.dev.log = [];
    this.itemDataRootParent.dev.log.unshift(logIdRootparent);
    if (this.itemDataRootParent.dev.log.length > this.historyNumber) {
      let logsDelId = this.itemDataRootParent.dev.log.slice(-1)[0];
      this.itemDataRootParent.dev.log.length = this.historyNumber;
      this.batch.delete(Singleton.logsRef.doc(logsDelId));
    }
    console.log("親のdev.log更新後",this.itemDataRootParent.dev.log)
    // firebase
    this.batch.update(Singleton.itemsRef.doc(this.parentNode.id), {
      value: this.itemDataRootParent.value,
      dev: this.itemDataRootParent.dev
    });
    console.log("親のitemsバッチ設定後")

    //親のlogs作成
    this.batch.set(Singleton.logsRef.doc(logIdRootparent), {
      uid: firebase.auth().currentUser!.uid,
      timestamp: this.updateTime,
      update: {
        value: this.itemDataRootParent.value
      },
      itemId: this.parentNode.id
    });
    console.log("親のlogsバッチ設定後")

  }

  async copyModule(childData:any,childId:string) {

    return new Promise(resolve => {

    console.log("copyModuleスタート",childData,childId)
    //子のlogId生成
    let logId = Singleton.logsRef.doc().id;
    console.log("子のlogId",logId)
    this.childLogsCreate(logId,childId);
    console.log("子のlogs設定から戻り")
    //items（子）のdev.logとcreateTimeを上書き
    if(!childData.dev)childData.dev={};
    if(!childData.dev.log)childData.dev.log=[];
    if(childData.dev)childData.dev.log.splice(0, childData.dev.log.length);
    childData.dev.log.push(logId);
    this.$set(childData, "createTime", this.updateTime);
    console.log("子のdev.logとcreateTime設定後")

    //typeがchildrenまたはgroupの時、孫の作成を繰り返す
    if (childData.type == "children" || childData.type == "group") {
      console.log("繰り返し処理の開始",childData.type,"コピー先のitemId",childId)
      // await this.grandChildCreate(childData);
      this.grandChildCreate(childData).then(() => {
        console.log("grandChildCreateからの戻り")
        console.log("childIdとchildData",childId,childData)
        this.childItemsCreate(childId,childData).then(() => {
          console.log("copyModuleエンド")
          resolve();
        });
      });
    }else{
      //items作成（子）
      console.log("chidlrenじゃない時の子のitemsCreateの呼び出し")
      this.childItemsCreate(childId,childData).then(() => {
        console.log("copyModuleエンド")
        resolve();
      });
    }

    })

  }

  childLogsCreate(logId:string,childId:string){
    //logs作成（子）
    // Singleton.logsRef.doc(logId).set({
      this.batch.set(Singleton.logsRef.doc(logId),{
      uid:firebase.auth().currentUser!.uid,
      timestamp:this.updateTime,
      itemId:childId
    });
    console.log("子のlogsバッチ設定後")
  }

  async childItemsCreate(childId:string,childData:any){
    this.batch.set(Singleton.itemsRef.doc(childId),childData);
    console.log("chileItemsCreate",childId,childData)
    // Singleton.itemsRef.doc(childId).set(childData);
    console.log("子のitemsバッチ設定後")
  }

  async grandChildCreate(childData:any){

    // return new Promise(resolve => {

      let objValue: any;
      let itemIdGrandchild: string;
      let nodeGrandChild: INodeObject;
      let n: number;
      console.log("grandChildCreateスタート")
      for (let i in childData.value) {
        console.log("for文の実行",i)
        itemIdGrandchild = Singleton.logsRef.doc().id;
        console.log("for文 コピー元のitemsのid",childData.value[i].id)
        // await this.grandChildValueSet(childData.value[i].id,itemIdGrandchild);
        await this.itemsDataGet(childData.value[i].id,"3");
        await this.copyModule(this.itemDataGrandchild,itemIdGrandchild);
        // this.grandChildValueSet(childData.value[i].id,itemIdGrandchild).then(() => {
          console.log("for文 grandChildValueSetから戻り","itemIdGrandChild",itemIdGrandchild)
          nodeGrandChild = {id: itemIdGrandchild};
          if(!objValue)objValue = [];
          n = Number( i );
          objValue.splice(n + 1, 0, nodeGrandChild);
          console.log("for文 valueのsplice後",objValue)
        // });
      }
      console.log("for文の終了","objValue",objValue)
      if(childData.value)childData.value.splice(0, childData.value.length);
      this.$set(childData, "value", objValue);
      console.log("valueの設定後",childData)

    //   resolve();
    // })

  }

  // async grandChildValueSet(itemIdOriginal:string,itemIdGrandchild:string){
  //   console.log("grandChildValuSetの開始（new Promise前）","itemIdGrandChild",itemIdGrandchild)
  //   return new Promise(resolve => {
  //     console.log("grandChildValuSetの開始（new Promise後）","itemIdGrandChild",itemIdGrandchild)
  //     this.itemsDataGet(itemIdOriginal,"3").then(() => {
  //       this.copyModule(this.itemDataGrandchild,itemIdGrandchild)
  //       resolve(this.itemDataGrandchild.moduleId);
  //       console.log("grandChildValueSet　copyModuleからの戻り")
  //     });
  //   })
  // }




  /**
   *
   * @param node
   * @param data
   * @private
   */
  private update(node: INodeObject, data: IItemData) {

  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
}
</script>

<style lang="scss">
.copy-module-comp2 {
  @include mediaquery-sm {
    display: none;
  }
}

[data-molle="embed"] {
  .copy-module-comp2 {
    display: none;
  }
}
</style>
