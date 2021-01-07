<template lang="pug">
  component(
    v-if="itemData.moduleId"
    :is="itemData.moduleId"
    :itemData="itemData"
    :data-item-id="itemId"
    :style="lsStore.storage.focusModuleId==itemId?{outline:'1px solid red'}:false"
  )
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {Singleton} from "~/src/Singleton";
  import firebase from "~/node_modules/firebase";
  import {IItemData} from "~/src/interface";
  import {lsStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class ModuleLoader extends Vue {
    @Prop() itemId!: string;
    itemData = <IItemData>{};
    lsStore = lsStore;
    private unsubscribe!: () => void;

    created() {
      if (Singleton.payload) {
        this.itemData = Singleton.payload.items[this.itemId];
        this.$set(this, "itemData", this.itemData);
      } else {
        this.unsubscribe = Singleton.itemsRef.doc(this.itemId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            Singleton.itemsRef.doc(this.itemId).set({
              moduleId: "Box"
            });
            return;
          }

          let _itemData = snap.data();
          this.$set(this, "itemData", _itemData);
        })
      }
    }

    beforeDestroy() {
      this.unsubscribe();
    }
  }
</script>

<style lang="scss">
</style>
