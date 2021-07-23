<template lang="pug">
.copy-module-comp.bootstrap(v-if="true && this.$route.query.hidden !== 'true'")
  button.btn.btn-sm.btn-outline-info(type="button", @click="pushCopy") Copy

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "molle-cms/src/Singleton";
import {IItemData, ILogsData, INodeObject} from "molle-cms/src/interface";

@Component({
  components: {},
})
export default class CopyModuleComp extends Vue {
  @Prop() label?: string;
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;

  itemData = <IItemData>{};
  itemDataParent = <IItemData>{};
  itemDataGrandchild = <IItemData>{};

  private unsubscribe!: () => void;
  private totalCount: number = 0;
  private totalCountloop: number = 0;
  private totalCountcreateloop: number = 0;
  private updateTime = firebase.firestore.Timestamp.now();
  maxHistory: number = 100;

  loop(parent: any, index: number, end: any) {
    console.log("loopスタート", parent, index)
    this.totalCount++;
    Singleton.itemsRef.doc(parent.value[index].id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData: any = snap.data();
        console.log("loopでitemデータ取得", itemData)
        parent.value[index].id = Singleton.itemsRef.doc().id;
        parent.value[index].obj = itemData;
        console.log("loopでobjを設定", parent.value[index].obj)

        if (itemData.type == "children") {
          console.log("loopでchildrenだった時")
          let count: number = 0;
          console.log("loopのfor文の直前")
          let n: number;
          for (let i in itemData.value) {
            console.log("loopのfor文の1行目", i)
            n = Number(i);
            count++;
            this.loop(itemData, n, () => {
              console.log("loop内のloopからの戻り")
              count--;
              if (count == 0) {
                console.log("loopでchildrenだった時の終了")
                this.totalCountloop++;
                end();
              }
            });
          }
        } else if (itemData.type == "group") {
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
        let itemData: any = snap.data();
        console.log("コピー対象のデータ取得", itemData)

        if (itemData.type == "children") {
          console.log("for文１の直前")
          let n: number;
          for (let i in itemData.value) {
            console.log("for文１の1行目", i)
            n = Number(i);
            this.loop(itemData, n, () => {
              console.log("loop呼んだあと", n, itemData)

              if (this.totalCount === this.totalCountloop) {
                console.log("completeの設定", this.totalCount)
                let complete: any = itemData;

                let createLoop = (_itemData: any, _itemId: string) => {
                  let batch = firebase.firestore().batch();
                  console.log("for文２の直前", _itemData)
                  let m: number;
                  if (_itemData.type == "children") {
                    for (let j in _itemData.value) {
                      console.log("for文２の1行目", j)
                      m = Number(j);
                      console.log("for文２でchildrenの時（createLoopを呼ぶところ）", _itemData.value[m].obj)
                      createLoop(_itemData.value[m].obj, _itemData.value[m].id);
                    }
                  }
                  console.log("objを削除するところ", _itemData.value[0].obj)
                  if (_itemData.value[0].obj) {
                    for (let i in _itemData.value) {
                      delete _itemData.value[i].obj;
                    }
                  }
                  _itemData.createTime = this.updateTime;
                  console.log("createするところ", _itemId, _itemData)
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
                  Singleton.logsRef.doc(_itemId).set({
                    history: [{
                      timestamp: this.updateTime,
                      uid: firebase.auth().currentUser!.uid
                    }]
                  });
                };
                console.log("createLoopを最初に呼ぶところ")
                createLoop(complete, node.id);
              }
            });
          }
        } else if (itemData.type == "group") {
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

  parentUpdate(node: any) {
    console.log("parentUpdateスタート", this.parentNode.id)
    Singleton.itemsRef.doc(this.parentNode.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        console.log("親のデータ取得")
        // let batch = firebase.firestore().batch();
        let itemDataParent: any = snap.data();
        console.log("snap.data", snap.data())
        console.log("itemDataParent処理前", itemDataParent)
        if (!itemDataParent.value) itemDataParent.value = [];
        if (this.beforeNode) {
          itemDataParent.value.some((_node: INodeObject, i: number) => {
            if (this.beforeNode!.id == _node.id) {
              itemDataParent.value.splice(i, 0, node);
              return true;
            }
          })
          console.log("beforeNode処理後", this.beforeNode, itemDataParent)
        } else if (this.afterNode) {
          console.log("afterNode", this.afterNode)
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
        Singleton.logsRef.doc(this.parentNode.id)
          .get()
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            let data = snap.data();
            if (data) {
              let history: ILogsData[] = data.history || [];
              history.unshift({
                timestamp: this.updateTime,
                uid: firebase.auth().currentUser!.uid,
                update: {
                  value: itemDataParent.value
                }
              });
              if (history.length > this.maxHistory) history.length = this.maxHistory;
              Singleton.logsRef.doc(this.parentNode.id).update({history: history});
            }
          })
        // batch.update(Singleton.itemsRef.doc(this.parentNode.id),itemDataParent);
        // batch.commit().then(() => {
        // });
      })
  }


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
.copy-module-comp {
  @include mediaquery-sm {
    display: none;
  }
}

[data-molle="embed"] {
  .copy-module-comp {
    display: none;
  }
}
</style>
