<template lang="pug">
.copy-module-comp.bootstrap(v-if="true && this.$route.query.hidden !== 'true'")
  button.btn.btn-sm.btn-outline-info(type="button", @click="pushCopy") {{$words.copy}}

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "~/molle-cms/src/Singleton";
import {IItemData, ILogsData, INodeObject} from "~/molle-cms/src/interface";
import {Utils} from "~/molle-cms/src/Utils";

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

  loop(parent: any, index: any, end: any) {
    this.totalCount++;
    Singleton.itemsRef.doc(parent.value[index].id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData: any = snap.data();
        parent.value[index].id = Singleton.itemsRef.doc().id;
        parent.value[index].obj = itemData;

        if (itemData.type == "group"
          ||
          (itemData.type == "children" && itemData.value.length > 0)) {
          let count: number = 0;
          for (let i in itemData.value) {
            count++;
            this.loop(itemData, i, () => {
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
      });
  }

  pushCopy() {
    this.totalCount = 0;
    this.loopFinishCount = 0;
    this.createFinishCount = 0;
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};
    let childNode!: INodeObject;
    if (this.beforeNode) childNode = this.beforeNode;
    if (this.afterNode) childNode = this.afterNode;
    Singleton.itemsRef.doc(childNode.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData: any = snap.data();

        if (itemData.type == "group"
          ||
          (itemData.type == "children" && itemData.value.length > 0)) {
          for (let i in itemData.value) {
            this.loop(itemData, i, () => {
              if (this.totalCount === this.loopFinishCount) {
                let complete: any = itemData;

                let createLoop = (_itemData: any, _itemId: string) => {
                  if (_itemData.type == "group"
                    ||
                    (_itemData.type == "children" && _itemData.value.length > 0)) {
                    for (let j in _itemData.value) {
                      createLoop(_itemData.value[j].obj, _itemData.value[j].id);
                    }
                  }
                  if (_itemData.value) {
                    for (let i in _itemData.value) {
                      delete _itemData.value[i].obj;
                    }
                  }
                  _itemData.createTime = this.updateTime;
                  Utils.updateItem(_itemId, _itemData, true)
                    .then(() => {
                      this.createFinishCount++;
                      if (this.totalCount < this.createFinishCount) {
                        this.parentUpdate(node);
                      }
                    });
                };

                createLoop(complete, node.id);

              }
            });
          }
        } else {
          itemData.createTime = this.updateTime;
          Utils.updateItem(node.id, itemData, true)
            .then(() => {
              this.parentUpdate(node);
            });
        }
      });
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
          });
        } else if (this.afterNode) {
          itemDataParent.value.some((_node: INodeObject, i: number) => {
            if (this.afterNode!.id == _node.id) {
              itemDataParent.value.splice(i + 1, 0, node);
              return true;
            }
          });
        } else {
          itemDataParent.value.push(node);
        }
        let update = {value: itemDataParent.value};
        Utils.updateItem(this.parentNode.id, update)
          .then(() => {
            this.$router.push({query: {...this.$route.query, focus: node.id}});
          });
      });
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
