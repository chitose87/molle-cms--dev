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
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;

  itemData = <IItemData>{};
  itemDataParent = <IItemData>{};

  private totalCount: number = 0;
  private loopFinishCount: number = 0;
  private createFinishCount: number = 0;
  private updateTime = firebase.firestore.Timestamp.now();
  maxHistory: number = 100;

  loop(parent: any, index: number, end: any) {
    this.totalCount++;
    Singleton.itemsRef.doc(parent.value[index].id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData: any = snap.data();
        parent.value[index].id = Singleton.itemsRef.doc().id;
        parent.value[index].obj = itemData;

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
        } else if (itemData.type == "group") {
          alert("カスタムモジュールはコピーできません")
          return;
        } else {
          this.loopFinishCount++;
          end();
        }
      })
  }

  pushCopy() {
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};
    let childNode!: INodeObject;
    if (this.beforeNode) childNode = this.beforeNode;
    if (this.afterNode) childNode = this.afterNode;
    Singleton.itemsRef.doc(childNode.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData: any = snap.data();

        if (itemData.type == "children" && itemData.value.length > 0) {
          let n: number;
          for (let i in itemData.value) {
            n = Number(i);
            this.loop(itemData, n, () => {
              if (this.totalCount === this.loopFinishCount) {
                let complete: any = itemData;

                let createLoop = (_itemData: any, _itemId: string) => {
                  let m: number;
                  if (_itemData.type == "children" && itemData.value.length > 0) {
                    for (let j in _itemData.value) {
                      m = Number(j);
                      createLoop(_itemData.value[m].obj, _itemData.value[m].id);
                    }
                  }
                  if (_itemData.value) {
                    for (let i in _itemData.value) {
                      delete _itemData.value[i].obj;
                    }
                  }
                  _itemData.createTime = this.updateTime;
                  Singleton.itemsRef.doc(_itemId)
                    .set(_itemData)
                    .then(() => {
                      this.createFinishCount++;
                      if (this.totalCount < this.createFinishCount) {
                        this.parentUpdate(node);
                      }
                    });
                  Singleton.logsRef.doc(_itemId).set({
                    history: [{
                      timestamp: this.updateTime,
                      uid: firebase.auth().currentUser!.uid
                    }]
                  });
                };

                createLoop(complete, node.id);

              }
            });
          }
        } else if (itemData.type == "group") {
          alert("カスタムモジュールはコピーできません")
          return;
        } else {
          itemData.createTime = this.updateTime;
          Singleton.itemsRef.doc(node.id)
            .set(itemData)
            .then(() => {
              this.parentUpdate(node);
            });
        }
      })
  }

  parentUpdate(node: any) {
    Singleton.itemsRef.doc(this.parentNode.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemDataParent: any = snap.data();
        if (!itemDataParent.value) itemDataParent.value = [];
        if (this.beforeNode) {
          itemDataParent.value.some((_node: INodeObject, i: number) => {
            if (this.beforeNode!.id == _node.id) {
              itemDataParent.value.splice(i, 0, node);
              return true;
            }
          })
        } else if (this.afterNode) {
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

  // beforeDestroy() {
  //   this.unsubscribe && this.unsubscribe();
  // }
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
