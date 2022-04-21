<template lang="pug">
component(
  :is="itemData.moduleId",
  :itemData="itemData",
  :data-item-id="node.id",
  :style="check()"
)
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
import firebase from "firebase";
import {IPageData, IItemData, INodeObject} from "../interface";
import {Singleton} from "../Singleton";
import {Module} from "./Module";

@Component({
  components: {},
})
export default class ModuleLoaderCms extends Vue {
  static modules = <{[key: string]: ModuleLoaderCms}>{};

  @Prop({default: () => ({id: 0})}) node!: INodeObject;
  @Prop({default: false}) isRoot!: boolean;

  //SPA,DEV
  get fromModule(): Module {
    return <Module>this.$parent;
  }

  itemData = <IItemData>{moduleId: "div"};
  private unsubscribe!: () => void;

  async fetch() {
    // console.log("node", this.node, this.isMolleCms)
    if (this.node.id) {
      if (this.unsubscribe) this.unsubscribe();

      this.unsubscribe = Singleton.itemsRef
        .doc(this.node.id)
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          // console.log(this.node.id, snap.exists);
          if (snap.exists) this.$set(this, "itemData", snap.data());
        });

      ModuleLoaderCms.modules[this.node.id] = this;
    }
  }

  check() {
    let obj: any = {};
    if (this.itemData.noExport) {
      obj.opacity = 0.5;
    }
    if (this.$route.query.edit != "true") {
      if (this.itemData.noExport ||
        (this.itemData.type == "children" && this.itemData.value.length == 0) ||
        (this.itemData.type == "text" && !this.itemData.value)
      ) {
        obj.display = "none !important";
      }
    } else if (this.$route.query.focus == this.node.id) {
      obj.outline = "2px solid red";
      obj.opacity = 1;
    } else if (this.$route.query.hover == this.node.id) {
      obj.outline = "2px solid reoranged";
    }
    return obj;
  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
}
</script>

<style lang="scss">
[data-reference] {
  pointer-events: none;
}
</style>
