<template lang="pug">
component(
  :is="itemData.moduleId",
  :itemData="itemData",
  :data-item-id="node.id",
  :ref="node.id",
  :style="check()"
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
export default class ModuleLoaderCms extends Vue {
  @Prop({default: () => ({id: 0})}) node!: INodeObject;

  //SPA,DEV
  get fromModule(): Module {
    return <Module>this.$parent;
  }

  get toModule(): Module {
    return <Module>this.$refs[this.node.id];
  }

  itemData = <IItemData>{moduleId: "div"};
  private unsubscribe!: () => void;

  async fetch() {
    // console.log("node", this.node, this.isMolleCms)
    if (this.node.id) {
      if (this.unsubscribe) this.unsubscribe();
      Singleton.firebaseInit(() => {
        this.unsubscribe = Singleton.itemsRef
            .doc(this.node.id)
            .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
              // console.log(this.node.id, snap.exists);
              if (snap.exists) this.$set(this, "itemData", snap.data());
            });
      });

      Singleton.modules[this.node.id] = this;
    }
  }

  check() {
    if (this.$route.query.hidden === "true") {
      return "";
    } else if (lsStore.storage.focusModuleNode.id == this.node.id) {
      return {outline: "2px solid red", opacity: 1};
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
