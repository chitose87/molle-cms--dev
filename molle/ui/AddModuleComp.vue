<template lang="pug">
.add-module-comp.bootstrap(v-if="lsStore.isEditer && this.$route.query.hidden !== 'true'")
  .mt-3.text-right
    span.text-info(v-if="label" v-html="label")
      b-icon.ml-1.mr-1(icon="box-arrow-in-left")

    form.form-group.form-check-inline(@submit.prevent v-if="itemData.moduleId" @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="key in moduleList", :value="key", v-html="key")
      button.btn.btn-sm.btn-info(type="submit") +

    //.text-center(v-if="beforeNode||afterNode")
      button.btn.btn-secondary(@click="addClone")
        span Clone

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
export default class AddModuleComp extends Vue {
  @Prop() label?: string;
  @Prop() parentNode!: INodeObject;
  @Prop() beforeNode?: INodeObject;
  @Prop() afterNode?: INodeObject;
  pushModuleSelected: string = "";
  lsStore = lsStore
  // localLoader!: ModuleLoader;

  itemData = <IItemData>{};
  moduleList: string[] = [];
  private unsubscribe!: () => void;

  mounted() {
    Singleton.itemsRef.doc(this.parentNode.id)
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        this.$set(this, "itemData", snap.data());

        // @ts-ignore
        let moduleOpt = this.$molleModules[this.itemData.moduleId];
        let response: string[] = [];
        if (moduleOpt.white) {
          response = moduleOpt.white;
        } else if (moduleOpt.black) {
          response = Object.keys(this.$molleModules).filter(
            (name: string) => moduleOpt.black!.indexOf(name) == -1,
          );
        }
        if (!this.pushModuleSelected) {
          this.pushModuleSelected = response[0];
        }
        this.$set(this, "moduleList", response);
      });
  }

  pushModule() {
    // console.log("pushModule", this.pushModuleSelected)
    if (!this.pushModuleSelected) return;
    let data: IItemData = this.$molleModules[this.pushModuleSelected].def;
    let node: INodeObject = {id: Singleton.itemsRef.doc().id};
    let logIdChildren = Singleton.logsRef.doc().id;
    let logIdParent = Singleton.logsRef.doc().id;
    let updateTime = firebase.firestore.FieldValue.serverTimestamp();
    let historyNumber = 5;  //ログの最大履歴数

    // firestoreのlogs登録（子） by青木
    if(!data.dev)data.dev={};
    if(!data.dev.log)data.dev.log=[];
    if(data.dev)data.dev.log.splice(0, data.dev.log.length);
    data.dev.log.push(logIdChildren);   //itemsにログIDを登録
    Singleton.logsRef.doc(logIdChildren).set({
      uid:firebase.auth().currentUser!.uid,
      timestamp:updateTime,
      itemId:node.id
    });

    Singleton.itemsRef
      .doc(node.id).set(data)
      .then(() => {
        if (this.beforeNode) {
          this.itemData.value.some((_node: INodeObject, i: number) => {
            if (this.beforeNode!.id == _node.id) {
              this.itemData.value.splice(i, 0, node);
              return true;
            }
          })
        } else if (this.afterNode) {
          this.itemData.value.some((_node: INodeObject, i: number) => {
            if (this.afterNode!.id == _node.id) {
              this.itemData.value.splice(i + 1, 0, node);
              return true;
            }
          })
        } else {
          this.itemData.value.push(node);
        }
        console.log("親のdev.log 前",this.itemData.dev)
        if(!this.itemData.dev)this.itemData.dev={};
        if(!this.itemData.dev.log)this.itemData.dev.log=[];
        this.itemData.dev.log.unshift(logIdParent);
        if (this.itemData.dev.log.length > historyNumber){
            console.log("親のdev.log 中",this.itemData.dev)
            let logsDelId = this.itemData.dev.log.slice(-1)[0];
            this.itemData.dev.log.length = historyNumber;
            Singleton.logsRef.doc(logsDelId).delete;
        }
        console.log("親のdev.log 後",this.itemData.dev)
        console.log("addの時のログID追加",this.itemData)
        // firebase
        Singleton.itemsRef.doc(this.parentNode.id)
          .update({
            value: this.itemData.value,
            dev: this.itemData.dev
          })
          .then(() => {
            lsStore.update({key: "focusModuleNode", value: node});
          });

        // firestoreのlogs登録（子） by青木
        Singleton.logsRef.doc(logIdParent).set({
            uid:firebase.auth().currentUser!.uid,
            timestamp:updateTime,
            update: {
              value: this.itemData.value
            },
            itemId:this.parentNode.id
        });
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
.add-module-comp {
  @include mediaquery-sm {
    display: none;
  }
}

[data-molle="embed"] {
  .add-module-comp {
    display: none;
  }
}
</style>
