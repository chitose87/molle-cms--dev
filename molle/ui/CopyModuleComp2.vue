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
import _item from "~/pages/_lv1/_item.vue";

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
  itemDataParent = <IItemData>{};
  itemDataGrandchild = <IItemData>{};

  private unsubscribe!: () => void;
  private totalCount:number = 0;
  private totalCountloop:number = 0;
  private totalCountcreateloop:number = 0;

  private updateTime = firebase.firestore.FieldValue.serverTimestamp();
  // private historyNumber = 5;  //ログの最大履歴数

  // test() {
  //   console.log("処理のスタート")
  //   this.testC(this.parentNode.id,this.testA);
  //   for (let i in this.itemData.value) {
  //     this.testC(this.itemData.value[i].id,this.testA);
  //   }
  //   this.testC(this.testA);
  // }
  //
  //
  // testA(msg:string) {
  //   console.log(msg)
  // }
  //
  // testB(msg:string) {
  //   console.log(msg)
  // }
  //
  // testC(id:string,callback:any) {
  //   console.log("testCスタート")
  //   Singleton.itemsRef.doc(id)
  //     .get()
  //     .then((snap: firebase.firestore.DocumentSnapshot) => {
  //       console.log("データ取得", snap.data())
  //       this.itemData = <IItemData>snap.data();
  //       callback("testA通過");
  //   });
  // }


  loop(parent:any,index:number,end:any) {
    console.log("loopスタート",parent,index)
    this.totalCount++;
    Singleton.itemsRef.doc(parent.value[index].id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData: any = snap.data();
        console.log("loopでitemデータ取得",itemData)
        parent.value[index].id = Singleton.itemsRef.doc().id;
        parent.value[index].obj = itemData;
        console.log("loopでobjを設定",parent.value[index].obj)

        if (itemData.type == "children") {
          console.log("loopでchildrenだった時")
          let count:number = 0;
          console.log("loopのfor文の直前")
          let n: number;
          for (let i in itemData.value) {
            console.log("loopのfor文の1行目",i)
            n = Number( i );
            count++;
            this.loop(itemData,n,() => {
              console.log("loop内のloopからの戻り")
              count--;
              if (count == 0) {
                console.log("loopでchildrenだった時の終了")
                this.totalCountloop++;
                end();
              }
            });
          }
        } else if(itemData.type == "group") {
          alert("カスタムモジュールはコピーできません")
          return;
        } else {
          console.log("loopでchildrenじゃなかった時の終了")
          this.totalCountloop++;
          end();
        }
      })

  }

  pushCopy() {
    console.log("pushCopyスタート")
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};
    let itemId = Singleton.itemsRef.doc().id;
    let childNode!: INodeObject;
    if (this.beforeNode) childNode = this.beforeNode;
    if (this.afterNode) childNode = this.afterNode;
    Singleton.itemsRef.doc(childNode.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData:any = snap.data();
        console.log("コピー対象のデータ取得",itemData)

        if (itemData.type == "children") {
          console.log("for文１の直前")
          let n: number;
          for (let i in itemData.value) {
            console.log("for文１の1行目",i)
            n = Number( i );
            this.loop(itemData, n, () => {
              console.log("loop呼んだあと",n,itemData)

              if(this.totalCount === this.totalCountloop) {
                console.log("completeの設定",this.totalCount)
                let complete:any = itemData;

                let createLoop = (_itemData:any,_itemId:string) => {
                  let batch = firebase.firestore().batch();
                  console.log("for文２の直前",_itemData)
                  let m: number;
                  if (_itemData.type == "children") {
                    for (let j in _itemData.value) {
                      console.log("for文２の1行目",j)
                      m = Number( j );
                      console.log("for文２でchildrenの時（createLoopを呼ぶところ）",_itemData.value[m].obj)
                      createLoop(_itemData.value[m].obj,_itemData.value[m].id);
                    }
                  }
                  console.log("objを削除するところ",_itemData.value[0].obj)
                  if (_itemData.value[0].obj) {
                    for (let i in _itemData.value) {
                      delete _itemData.value[i].obj;
                    }
                  }
                  _itemData.createTime = this.updateTime;
                  console.log("createするところ",_itemId,_itemData)
                  Singleton.itemsRef.doc(_itemId)
                    .set(_itemData)
                    .then(() => {
                      // batch.set(Singleton.itemsRef.doc(_itemId),_itemData);
                      this.totalCountcreateloop++;
                      if (this.totalCount < this.totalCountcreateloop) {
                        // console.log("バッチコミット",this.totalCountcreateloop)
                        // batch.commit().then(() => {
                        this.parentUpdate(node);
                        // });
                      }
                    });
                };
                console.log("createLoopを最初に呼ぶところ")
                createLoop(complete,node.id);
              }
            });
          }
        } else if(itemData.type == "group") {
          alert("カスタムモジュールはコピーできません")
          return;
        } else {
          console.log("boxのコピーじゃない時")
          // let batch = firebase.firestore().batch();
          itemData.createTime = this.updateTime;
          Singleton.itemsRef.doc(node.id)
            .set(itemData)
            .then(() => {
              this.parentUpdate(node);
            });
          // batch.set(Singleton.itemsRef.doc(node.id),itemData);
          // batch.commit().then(() => {
          // });
        }
      })
  }

  parentUpdate(node:any) {
    console.log("parentUpdateスタート",this.parentNode.id)
    Singleton.itemsRef.doc(this.parentNode.id)
    .get()
    .then((snap: firebase.firestore.DocumentSnapshot) => {
      console.log("親のデータ取得")
      // let batch = firebase.firestore().batch();
      let itemDataParent: any = snap.data();
      console.log("snap.data",snap.data())
      console.log("itemDataParent処理前",itemDataParent)
      if (!itemDataParent.value) itemDataParent.value = [];
      if (this.beforeNode) {
        itemDataParent.value.some((_node: INodeObject, i: number) => {
          if (this.beforeNode!.id == _node.id) {
            itemDataParent.value.splice(i, 0, node);
            return true;
          }
        })
        console.log("beforeNode処理後",this.beforeNode,itemDataParent)
      } else if (this.afterNode) {
        console.log("afterNode",this.afterNode)
        itemDataParent.value.some((_node: INodeObject, i: number) => {
          if (this.afterNode!.id == _node.id) {
            itemDataParent.value.splice(i + 1, 0, node);
            return true;
          }
        })
      } else {
        itemDataParent.value.push(node);
      }
      Singleton.itemsRef.doc(this.parentNode.id)
        .update(itemDataParent)
        .then(() => {
          console.log("コピー完了")
      });

      // batch.update(Singleton.itemsRef.doc(this.parentNode.id),itemDataParent);
      // batch.commit().then(() => {
      // });
    })
  }


  //ここから


  // pushCopy() {
  //   console.log("pushCopyスタート")
  //   let nodeOrigin!: INodeObject;
  //   if (this.beforeNode) nodeOrigin = this.beforeNode;
  //   if (this.afterNode) nodeOrigin = this.afterNode;
  //   console.log("nodeOrigin",nodeOrigin.id)
  //   this.itemDataGet(nodeOrigin.id,"child","","",this.pushCopy2);
  // }
  //
  // pushCopy2(itemData:any) {
  //   console.log("pushCopy2スタート")
  //   let node: INodeObject = {id: Singleton.itemsRef.doc().id};
  //   this.copyModule(itemData,node.id);
  //   this.parentCopy(node);
  // }
  //
  // parentCopy(node:any) {
  //   console.log("parentCopyスタート")
  //   this.itemDataGet(this.parentNode.id,"parent","",node,this.parentValueSet);
  // }
  //
  // copyModule(childData:any,childId:string) {
  //   console.log("copyModuleスタート",childId,childData)
  //   childData.createTime = this.updateTime;
  //   if (childData.type == "children" || childData.type == "group"){
  //     let objValue: any;
  //     let itemIdGrandchild: string;
  //     let nodeGrandChild: INodeObject;
  //     let n: number;
  //     console.log("childData.value",childData.value)
  //     for (let i in childData.value) {
  //       console.log("繰り返し",i,"回目")
  //       itemIdGrandchild = Singleton.itemsRef.doc().id;
  //       this.itemDataGet(childData.value[i].id,"grandchild",itemIdGrandchild,"",this.copyModule);
  //       console.log("itemDataGetの次")
  //       nodeGrandChild = {id: itemIdGrandchild};
  //       if(!objValue)objValue = [];
  //       n = Number( i );
  //       objValue.splice(n + 1, 0, nodeGrandChild);
  //     }
  //     if(childData.value)childData.value.splice(0, childData.value.length);
  //     if(!objValue)childData.value = objValue;
  //     //firebase
  //     this.childCreate(childId,childData,this.childCreateComplete);
  //   }
  // }
  //
  // childCreate(childId:string,childData:any,callback:any){
  //   let batchChild = firebase.firestore().batch();
  //   batchChild.set(Singleton.itemsRef.doc(childId),childData);
  //   batchChild.commit().then(() => {
  //     callback();
  //   });
  // }
  //
  // childCreateComplete(){
  //   console.log("子モジュールのバッチ完了")
  // }
  //
  // itemDataGet(itemId:string,paramFlag:string,grandchildId:string,node:any,callback:any) {
  //   console.log("itemDataGetスタート",itemId,paramFlag)
  //   Singleton.itemsRef.doc(itemId)
  //     .get()
  //     .then((snap: firebase.firestore.DocumentSnapshot) => {
  //       if(paramFlag === "parent"){
  //         this.itemDataParent = <IItemData>snap.data();
  //         console.log("itemDataParentの取得",itemId,this.itemDataParent)
  //         callback(node,this.itemDataParent);
  //       }else if(paramFlag === "child") {
  //         this.itemData = <IItemData>snap.data();
  //         console.log("itemDataの取得",itemId,this.itemData)
  //         callback(this.itemData);
  //       }else if(paramFlag === "grandchild") {
  //         this.itemDataGrandchild = <IItemData>snap.data();
  //         console.log("itemDataGrandchildの取得",itemId,this.itemDataGrandchild)
  //         callback(this.itemDataGrandchild,grandchildId);
  //       }
  //   });
  // }
  //
  // parentValueSet(node:any,itemDataParent:any) {
  //   let batchParent = firebase.firestore().batch();
  //   if (!itemDataParent.value) itemDataParent.value = [];
  //   if (this.beforeNode) {
  //     itemDataParent.value.some((_node: INodeObject, i: number) => {
  //       if (this.beforeNode!.id == _node.id) {
  //         itemDataParent.value.splice(i, 0, node);
  //       }
  //     })
  //   } else if (this.afterNode) {
  //     itemDataParent.value.some((_node: INodeObject, i: number) => {
  //       if (this.afterNode!.id == _node.id) {
  //         itemDataParent.value.splice(i + 1, 0, node);
  //       }
  //     })
  //   } else {
  //     itemDataParent.value.push(node);
  //   }
  //   //firebase
  //   this.parentCreate(this.parentNode.id,itemDataParent,this.parentCreateComplete);
  // }
  //
  // parentCreate(parentId:string,parentData:any,callback:any){
  //   let batchParent = firebase.firestore().batch();
  //   batchParent.update(Singleton.itemsRef.doc(parentId), {
  //     value: parentData.value
  //   });
  //   batchParent.commit().then(() => {
  //     callback();
  //   });
  // }
  //
  // parentCreateComplete(){
  //   console.log("親モジュールのバッチ完了")
  // }







  //ここまで

  //ここから下は最初に作ったやつ（あとで消す）

  // async pushCopy() {
  //   console.log("pushCopy()スタート")
  //   this.batch = firebase.firestore().batch();
  //   //呼び出し元から渡されたidでitemsのデータ取得（親と子）
  //   await this.itemsDataGet(this.parentNode.id,"1");
  //   let childNode!: INodeObject;
  //   if (this.beforeNode) childNode = this.beforeNode;
  //   if (this.afterNode) childNode = this.afterNode;
  //   await this.itemsDataGet(childNode.id,"2");
  //
  //   //親のlogId生成
  //   let logIdRootparent = Singleton.logsRef.doc().id;
  //   console.log("親のlogId", logIdRootparent)
  //
  //   //子のitemId生成
  //   let node: INodeObject = {id: Singleton.itemsRef.doc().id};
  //   console.log("子のitemId", node.id)
  //
  //   //items（親）のvalue、dev.log更新
  //   //logs（親）作成
  //   this.parentDataUpdate(logIdRootparent,node);
  //
  //   //子の作成
  //   await this.copyModule(this.itemData, node.id);
  //   console.log("copyModuleからの戻り")
  //
  //   this.batch.commit();
  //   console.log("batchコミット時のnode",node)
  //   lsStore.update({key: "focusModuleNode", value: node});
  //
  // }
  //
  // async itemsDataGet(itemId:string,paramflag:string) {
  //   return new Promise(resolve => {
  //     Singleton.itemsRef.doc(itemId)
  //       .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
  //         if(paramflag === "1"){
  //           this.$set(this, "itemDataRootParent", snap.data());
  //           console.log("itemDataRootParentの取得", this.itemDataRootParent)
  //           resolve();
  //         }else if(paramflag === "2") {
  //           this.$set(this, "itemData", snap.data());
  //           console.log("itemDataの取得",this.itemData)
  //           resolve();
  //         }else {
  //           this.$set(this, "itemDataGrandchild", snap.data());
  //           console.log("itemDataGrandchildの取得",this.itemDataGrandchild)
  //           resolve();
  //         }
  //     });
  //   })
  // }
  //
  // async parentDataUpdate(logIdRootparent:string,node:any) {
  //   //親のitems　value更新
  //   console.log("親のvalue更新前", this.itemDataRootParent.value)
  //   if (!this.itemDataRootParent.value) this.itemDataRootParent.value = [];
  //   if (this.beforeNode) {
  //     this.itemDataRootParent.value.some((_node: INodeObject, i: number) => {
  //       if (this.beforeNode!.id == _node.id) {
  //         this.itemDataRootParent.value.splice(i, 0, node);
  //         return true;
  //       }
  //     })
  //   } else if (this.afterNode) {
  //     this.itemDataRootParent.value.some((_node: INodeObject, i: number) => {
  //       if (this.afterNode!.id == _node.id) {
  //         this.itemDataRootParent.value.splice(i + 1, 0, node);
  //         return true;
  //       }
  //     })
  //   } else {
  //     this.itemDataRootParent.value.push(node);
  //   }
  //   console.log("親のvalue更新後", this.itemDataRootParent.value)
  //
  //   //親のitems　dev.log更新
  //   if (!this.itemDataRootParent.dev) this.itemDataRootParent.dev = {};
  //   if (!this.itemDataRootParent.dev.log) this.itemDataRootParent.dev.log = [];
  //   this.itemDataRootParent.dev.log.unshift(logIdRootparent);
  //   if (this.itemDataRootParent.dev.log.length > this.historyNumber) {
  //     let logsDelId = this.itemDataRootParent.dev.log.slice(-1)[0];
  //     this.itemDataRootParent.dev.log.length = this.historyNumber;
  //     this.batch.delete(Singleton.logsRef.doc(logsDelId));
  //   }
  //   console.log("親のdev.log更新後",this.itemDataRootParent.dev.log)
  //   // firebase
  //   this.batch.update(Singleton.itemsRef.doc(this.parentNode.id), {
  //     value: this.itemDataRootParent.value,
  //     dev: this.itemDataRootParent.dev
  //   });
  //   console.log("親のitemsバッチ設定後")
  //
  //   //親のlogs作成
  //   this.batch.set(Singleton.logsRef.doc(logIdRootparent), {
  //     uid: firebase.auth().currentUser!.uid,
  //     timestamp: this.updateTime,
  //     update: {
  //       value: this.itemDataRootParent.value
  //     },
  //     itemId: this.parentNode.id
  //   });
  //   console.log("親のlogsバッチ設定後")
  //
  // }
  //
  // async copyModule(childData:any,childId:string) {
  //
  //   return new Promise(resolve => {
  //
  //   console.log("copyModuleスタート",childData,childId)
  //   //子のlogId生成
  //   let logId = Singleton.logsRef.doc().id;
  //   console.log("子のlogId",logId)
  //   this.childLogsCreate(logId,childId);
  //   console.log("子のlogs設定から戻り")
  //   //items（子）のdev.logとcreateTimeを上書き
  //   if(!childData.dev)childData.dev={};
  //   if(!childData.dev.log)childData.dev.log=[];
  //   if(childData.dev)childData.dev.log.splice(0, childData.dev.log.length);
  //   childData.dev.log.push(logId);
  //   this.$set(childData, "createTime", this.updateTime);
  //   console.log("子のdev.logとcreateTime設定後")
  //
  //   //typeがchildrenまたはgroupの時、孫の作成を繰り返す
  //   if (childData.type == "children" || childData.type == "group") {
  //     console.log("繰り返し処理の開始",childData.type,"コピー先のitemId",childId)
  //     // await this.grandChildCreate(childData);
  //     this.grandChildCreate(childData).then(() => {
  //       console.log("grandChildCreateからの戻り")
  //       console.log("childIdとchildData",childId,childData)
  //       this.childItemsCreate(childId,childData).then(() => {
  //         console.log("copyModuleエンド")
  //         resolve();
  //       });
  //     });
  //   }else{
  //     //items作成（子）
  //     console.log("chidlrenじゃない時の子のitemsCreateの呼び出し")
  //     this.childItemsCreate(childId,childData).then(() => {
  //       console.log("copyModuleエンド")
  //       resolve();
  //     });
  //   }
  //
  //   })
  //
  // }
  //
  // childLogsCreate(logId:string,childId:string){
  //   //logs作成（子）
  //   // Singleton.logsRef.doc(logId).set({
  //     this.batch.set(Singleton.logsRef.doc(logId),{
  //     uid:firebase.auth().currentUser!.uid,
  //     timestamp:this.updateTime,
  //     itemId:childId
  //   });
  //   console.log("子のlogsバッチ設定後")
  // }
  //
  // async childItemsCreate(childId:string,childData:any){
  //   this.batch.set(Singleton.itemsRef.doc(childId),childData);
  //   console.log("chileItemsCreate",childId,childData)
  //   // Singleton.itemsRef.doc(childId).set(childData);
  //   console.log("子のitemsバッチ設定後")
  // }
  //
  // async grandChildCreate(childData:any){
  //
  //     let objValue: any;
  //     let itemIdGrandchild: string;
  //     let nodeGrandChild: INodeObject;
  //     let n: number;
  //     console.log("grandChildCreateスタート")
  //     for (let i in childData.value) {
  //       console.log("for文の実行",i)
  //       itemIdGrandchild = Singleton.logsRef.doc().id;
  //       console.log("for文 コピー元のitemsのid",childData.value[i].id)
  //       await this.itemsDataGet(childData.value[i].id,"3");
  //       await this.copyModule(this.itemDataGrandchild,itemIdGrandchild);
  //         console.log("for文 grandChildValueSetから戻り","itemIdGrandChild",itemIdGrandchild)
  //         nodeGrandChild = {id: itemIdGrandchild};
  //         if(!objValue)objValue = [];
  //         n = Number( i );
  //         objValue.splice(n + 1, 0, nodeGrandChild);
  //         console.log("for文 valueのsplice後",objValue)
  //     }
  //     console.log("for文の終了","objValue",objValue)
  //     if(childData.value)childData.value.splice(0, childData.value.length);
  //     this.$set(childData, "value", objValue);
  //     console.log("valueの設定後",childData)
  //
  //
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
