<template lang="pug">
<!--.log-property-comp(v-if="lsStore.storage.focusModuleNode.id")-->
<!--  .log.bg-light(v-if="flag")-->
.log-property-comp
  .log-body.log-1
    ul.log-list
      li(v-for="log in this.log")
        LogDataComp(:logId="log")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject, ILogsData} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";
import LogDataComp from "~/molle/ui/LogDataComp.vue";

@Component({
  components: {LogDataComp}
})
export default class LogPropertyComp extends Vue {
  itemId: string = "";
  itemData = <IItemData>{};
  itemDataBefore = <IItemData>{};
  // @Prop() log!:ILogsData[];
  @Prop() log!:string[];
  lsStore = lsStore;
  private unsubscribe?: () => void;
  flag = false;

  mounted() {
    console.log("★★LogPropertyComp通過★★",this.log)
  }


  // @Watch('lsStore.storage.focusModuleNode', {immediate: true})
  // onChangeFocusModuleNode(newer: INodeObject, older?: INodeObject) {
  //   console.log("LogPropertyComp通過")
  // }

  // @Watch('lsStore.storage.focusModuleNode', {immediate: true})

  // onChangeFocusModuleNode(newer: INodeObject, older?: INodeObject) {
  //     if (newer && newer.id) {
  //       console.log("onChangeFocusModuleNode")
  //       this.flag = false;
  //       if (this.unsubscribe) {
  //         this.unsubscribe();
  //       }
  //
  //       this.unsubscribe = Singleton.itemsRef.doc(newer.id).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
  //       // this.unsubscribe = Singleton.logsRef.doc(this.log[0]).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
  //         if (!snap.exists) return;
  //
  //         // this.logsData = Singleton.logsRef.doc("8udIRJYlRbwjOHU0SmYt").onSnapshot((snaplog: firebase.firestore.DocumentSnapshot) => {
  //         //   this.logsData = <ILogsData>snaplog.data();
  //         // };
  //         console.log("a地点",this.log)
  //         // let LogData = <ILogsData>snap.data();
  //         // console.log("x地点",LogData)
  //         this.itemDataBefore = <IItemData>snap.data();
  //         let itemData = Object.assign({}, this.$molleModules[this.itemDataBefore.moduleId].def, snap.data());
  //         console.log("itemDataの表示",itemData)
  //         // if (!itemData.option) itemData.option = {};
  //         // if (!itemData.class) itemData.class = {};
  //         // if (!itemData.style) itemData.style = {};
  //         this.$set(this, "itemData", itemData);
  //         this.$set(this, "itemId", snap.id);
  //         this.flag = true;
  //       });
  //     }
  // }
}
</script>

<style lang="scss">
.log-property-comp {
}

.hoge {
  z-index: $zindex-modal;
}
</style>
