<template lang="pug">
.copy-module-comp.bootstrap(v-if="lsStore.isEditer && this.$route.query.hidden !== 'true'")
  button.btn.btn-sm.btn-outline-info(type="button", @click="copyModule") submit

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
export default class CopyModuleComp extends Vue {
  @Prop() label?: string;
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;
  lsStore = lsStore

  itemData = <IItemData>{};
  itemDataParent = <IItemData>{};

  private unsubscribe!: () => void;

  mounted() {
    console.log("this.parentNode",this.parentNode)
    console.log("this.beforeNode",this.beforeNode)
    console.log("this.afterNode",this.afterNode)


    Singleton.itemsRef.doc(this.parentNode.id)
    .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
      this.$set(this, "itemDataParent", snap.data());
      console.log("this.itemDataParent",this.itemDataParent)

      if (this.beforeNode) {
        Singleton.itemsRef.doc(this.beforeNode.id)
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            this.$set(this, "itemData", snap.data());
            console.log("this.itemData", this.itemData)
        });
      }else if (this.afterNode) {
        Singleton.itemsRef.doc(this.afterNode.id)
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            this.$set(this, "itemData", snap.data());
            console.log("this.itemData", this.itemData)
        });
      }

    });

  }


  copyModule() {
    console.log("CopyModuleCompのcopyModule通過")
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};
    let logId = Singleton.logsRef.doc().id;
    let logIdParent = Singleton.logsRef.doc().id;
    let updateTime = firebase.firestore.FieldValue.serverTimestamp();
    let historyNumber = 5;  //ログの最大履歴数

    console.log("this.itemData",this.itemData)
    // firestoreのlogs登録（子） by青木
    if(!this.itemData.dev)this.itemData.dev={};
    if(!this.itemData.dev.log)this.itemData.dev.log=[];
    if(this.itemData.dev)this.itemData.dev.log.splice(0, this.itemData.dev.log.length);
    this.itemData.dev.log.push(logId);   //itemsにログIDを登録
    this.$set(this.itemData, "createTime", updateTime);
    Singleton.logsRef.doc(logId).set({
      uid:firebase.auth().currentUser!.uid,
      timestamp:updateTime,
      itemId:node.id
    });

    Singleton.itemsRef
      .doc(node.id).set(this.itemData)
      .then(() => {
        if (this.beforeNode) {
          this.itemDataParent.value.some((_node: INodeObject, i: number) => {
            if (this.beforeNode!.id == _node.id) {
              this.itemDataParent.value.splice(i, 0, node);
              return true;
            }
          })
        } else if (this.afterNode) {
          this.itemDataParent.value.some((_node: INodeObject, i: number) => {
            if (this.afterNode!.id == _node.id) {
              this.itemDataParent.value.splice(i + 1, 0, node);
              return true;
            }
          })
        } else {
          this.itemDataParent.value.push(node);
        }
        console.log("親のdev.log 前",this.itemDataParent.dev)
        if(!this.itemDataParent.dev)this.itemDataParent.dev={};
        if(!this.itemDataParent.dev.log)this.itemDataParent.dev.log=[];
        this.itemDataParent.dev.log.unshift(logIdParent);
        if (this.itemDataParent.dev.log.length > historyNumber){
            console.log("親のdev.log 中",this.itemDataParent.dev)
            let logsDelId = this.itemDataParent.dev.log.slice(-1)[0];
            this.itemDataParent.dev.log.length = historyNumber;
            Singleton.logsRef.doc(logsDelId).delete;
        }
        console.log("親のdev.log 後",this.itemDataParent.dev)
        console.log("copyの時のログID追加",this.itemDataParent)
        // firebase
        Singleton.itemsRef.doc(this.parentNode.id)
          .update({
            value: this.itemDataParent.value,
            dev: this.itemDataParent.dev
          })
          .then(() => {
            lsStore.update({key: "focusModuleNode", value: node});
          });

        // firestoreのlogs登録（親） by青木
        Singleton.logsRef.doc(logIdParent).set({
            uid:firebase.auth().currentUser!.uid,
            timestamp:updateTime,
            update: {
              value: this.itemDataParent.value
            },
            itemId:this.parentNode.id
        });
        console.log("コピーしたモジュールID",node.id)
        console.log("コピーしたログID",logId)
        console.log("コピーしたモジュールID　親",this.parentNode.id)
        console.log("コピーしたログID　親",logIdParent)
      })
  }

  addClone() {
    let ba = <INodeObject>this.beforeNode || this.afterNode;
    Singleton.itemsRef.doc(ba.id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>snap.data();
        let node: INodeObject = {id: Singleton.itemsRef.doc().id};
        console.log(itemData);
        // itemData.value.forEach
        //todo

        // this.update(node, data);
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
