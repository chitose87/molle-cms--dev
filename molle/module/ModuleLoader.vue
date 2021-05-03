<template lang="pug">
//SPA,DEV
component(
  v-if="$nuxt.context.isDev || isMolleCms"
  :is="itemData.moduleId",
  :itemData="itemData",
  :data-item-id="node.id",
  :ref="node.id",
  :style="check()"
)
//gen module
component(
  v-else-if="!$nuxt.context.isDev",
  :is="itemData.moduleId",
  :itemData="itemData"
)
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch,} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";
import {IPageData, IItemData, INodeObject, IPayload} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  /**
   * SSGの際にapp.jsから削除されるoption
   */
    // static MOLLE_DELETE_WITH_STATIC_MODE = true;

  @Prop({default: () => ({id: 0})}) node!: INodeObject;
  isMolleCms = process.env.isMolleCms;

  //SPA,DEV
  get fromModule(): Module {
    return <Module>this.$parent;
  }

  get toModule(): Module {
    return <Module>this.$refs[this, this.node.id];
  }

  itemData = <IItemData>{moduleId: "div"};
  private unsubscribe!: () => void;

  async fetch() {
    // console.log("node", this.node, this.isMolleCms)
    if (this.$nuxt.context.isDev || this.isMolleCms) {
      //SPA,DEV
      if (this.node.id) {
        if (this.unsubscribe) this.unsubscribe();
        Singleton.firebaseInit(() => {
          // console.log(this.node.id);
          this.unsubscribe = Singleton.itemsRef
            .doc(this.node.id)
            .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
              //todo シンボリックリンク
              if (!snap.exists) {
                if (this.node!.fixedModuleId) {
                  Singleton.itemsRef.doc(this.node.id).set(this.$molleModules[this.node!.fixedModuleId].def);
                }
                return;
              }
              // console.log(snap.data())
              this.itemData = <IItemData>snap.data();
            });
        });

        Singleton.modules[this.node.id] = this;
      }
    } else {
      this.itemData = this.$nuxt.context.payload.items[this.node.id];
      delete this.itemData.createTime;
      delete this.itemData.updateTime;
    }
  }

  check() {
    if (this.$route.query.hidden === "true") {
      return "";
    } else if (lsStore.storage.focusModuleNode.id == this.node.id) {
      return {outline: "2px solid red"};
    } else if (lsStore.storage.hoverModuleNode.id == this.node.id) {
      return {outline: "2px solid orange"};
    }
  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
}
</script>

<style lang="scss">
</style>
