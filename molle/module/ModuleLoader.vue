<template lang="pug">
//SSG only
component(
  v-if="lsStore.isSSG",
  :is="lsStore.payload.items[itemId].moduleId",
  :itemData="lsStore.payload.items[itemId]"
)
//SPA,DEV
component(
  v-else,
  :is="itemData.moduleId",
  :itemData="itemData",
  :data-item-id="itemId",
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
import {IItemData, IPayload} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  @Prop() itemId?: string;

  //SSG only
  // @Prop() payload?: IPayload;

  //SPA,DEV
  itemData = <IItemData>{};
  private unsubscribe!: () => void;
  lsStore = lsStore;

  created() {
    // console.log("created", this.payload);
    if (!lsStore.isSSG && this.itemId) {
      //SPA,DEV
      Singleton.firebaseInit(() => {
        this.unsubscribe = Singleton.itemsRef
          .doc(this.itemId)
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) {
              Singleton.itemsRef.doc(this.itemId).set({
                moduleId: "Box",
              });
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
    } else if (lsStore.storage.focusModuleId == this.itemId) {
      return {outline: "2px solid red"};
    } else if (lsStore.storage.hoverModuleId == this.itemId) {
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
