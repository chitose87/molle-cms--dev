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
import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
import {Singleton} from "~/molle-cms/src/Singleton";
import firebase from "firebase";
import {IPageData, IItemData, INodeObject} from "~/molle-cms/src/interface";
import {Module} from "~/molle-cms/src/module/Module";

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
  style: any = {};
  private unsubscribe!: () => void;
  static modules = <{[key: string]: ModuleLoaderCms}>{};

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

      ModuleLoaderCms.modules[this.node.id] = this;
    }
  }

  check() {
    if (this.$route.query.edit != "true" || this.$route.query.hidden === "true") {
      return "";
    } else if (this.$route.query.focus == this.node.id) {
      return {outline: "2px solid red", opacity: 1};
    } else if (this.$route.query.hover == this.node.id) {
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
