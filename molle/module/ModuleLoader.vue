<template lang="pug">
//SSG only
component(
  v-if="lsStore.isSSG && node.id",
  :is="lsStore.payload.items[node.id].moduleId",
  :itemData="lsStore.payload.items[node.id]"
)
//SPA,DEV
component(
  v-else-if="node.id",
  :is="itemData.moduleId",
  :itemData="itemData",
  :data-item-id="node.id",
  :style="check()"
)
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";
import {IItemData, INodeObject, IPayload} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";
import {Module} from "~/molle/module/Module";
import {molleModules} from "~/molle/module/index";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  @Prop() node!: INodeObject;

  get fromModule(): Module {
    return <Module>this.$parent?.$vnode?.context
  }

  get toModule(): Module {
    return <Module>this.$children[0];
  }

  //SSG only
  // @Prop() payload?: IPayload;

  //SPA,DEV
  itemData = <IItemData>{};
  private unsubscribe!: () => void;
  lsStore = lsStore;

  created() {
    // console.log("created", this.payload);
  }

  @Watch("node", {immediate: true})
  updateNode() {
    if (!lsStore.isSSG && this.node && this.node.id) {
      //SPA,DEV
      if (this.unsubscribe) this.unsubscribe();
      Singleton.firebaseInit(() => {
        console.log(this.node.id)
        this.unsubscribe = Singleton.itemsRef
          .doc(this.node.id)
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) {
              Singleton.itemsRef.doc(this.node.id).set(
                molleModules[this.node.fixedModuleId || "Box"].def
              );
              return;
            }

            let _itemData = snap.data();
            console.log(_itemData);
            this.$set(this, "itemData", _itemData);
          });
      });
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
