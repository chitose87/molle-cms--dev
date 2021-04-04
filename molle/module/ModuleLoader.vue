<template lang="pug">
//SPA,DEV
component(
  v-if="$nuxt.context.isDev || isMolleCms"
  :is="itemData.moduleId",
  :itemData="itemData",
  :data-item-id="node.id",
  :style="check()"
)
//gen page
component(
  v-else-if="!$nuxt.context.isDev && mRoot",
  :is="$nuxt.context.payload.items[$nuxt.context.payload.pageData.itemId].moduleId",
  :itemData="$nuxt.context.payload.items[$nuxt.context.payload.pageData.itemId]"
)
//gen module
component(
  v-else-if="!$nuxt.context.isDev",
  :is="$nuxt.context.payload.items[node.id].moduleId",
  :itemData="$nuxt.context.payload.items[node.id]"
)
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch,} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";
import {IPageData, IItemData, INodeObject, IPayload} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";
import {Module} from "~/molle/module/Module";
import {molleModules} from "~/molle/module/index";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  /**
   * SSGの際にapp.jsから削除されるoption
   */
  static MOLLE_DELETE_WITH_STATIC_MODE = true;

  @Prop({default: () => ({id: 0})}) node!: INodeObject;
  @Prop() mRoot?: boolean;
  @Prop({default: () => ({})}) pageDataByEditer?: any;// use editer.vue
  isMolleCms = process.env.isMolleCms;

  //SPA,DEV
  get fromModule(): Module {
    return <Module>this.$parent?.$vnode?.context
  }

  get toModule(): Module {
    return <Module>this.$children[0];
  }

  itemData = <IItemData>{moduleId: "div"};
  private unsubscribe!: () => void;

  @Watch("node.id", {immediate: true})
  updateNode() {
    if (this.$nuxt.context.isDev || this.isMolleCms) {
      console.log("node", this.node.id, this.mRoot, this.isMolleCms)
      //SPA,DEV
      if (this.node.id) {
        // module
        if (this.unsubscribe) this.unsubscribe();
        Singleton.firebaseInit(() => {
          console.log(this.node.id);
          this.unsubscribe = Singleton.itemsRef
            .doc(this.node.id)
            .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
              if (!snap.exists) {
                Singleton.itemsRef.doc(this.node.id).set(
                  molleModules[this.node!.fixedModuleId || "Box"].def
                );
                return;
              }

              let itemData = snap.data();
              console.log(itemData)
              this.$set(this, "itemData", itemData);
            });
        });
      } else if (this.mRoot) {
        // page
        if (this.pageDataByEditer.itemId) {
          this.$set(this.node, "id", this.pageDataByEditer.itemId)
          return;
        }
        Singleton.getCurrentPageData(this.$route)
          .then((pageData: IPageData) => {
            this.$set(this.node, "id", pageData.itemId)
          });
      }
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
