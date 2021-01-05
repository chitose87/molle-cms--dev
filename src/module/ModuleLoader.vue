<template lang="pug">
  component(
    v-if="itemData.moduleId"
    :is="itemData.moduleId"
    :itemData="itemData"
    :data-item-id="itemId"
  )
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {Singleton} from "~/src/Singleton";
  import firebase from "~/node_modules/firebase";
  import {IItemData} from "~/src/interface";

  @Component({
    components: {}
  })
  export default class ModuleLoader extends Vue {
    @Prop() itemId!: string;
    itemData = <IItemData>{};

    created() {
      if (Singleton.payload) {
        this.itemData = Singleton.payload.items[this.itemId];
        this.$set(this, "itemData", this.itemData);
      } else {
        Singleton.itemsRef.doc(this.itemId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
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
  }
</script>

<style lang="scss">
</style>
