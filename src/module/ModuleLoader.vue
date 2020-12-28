<template lang="pug">
  component(
    v-if="flag"
    :is="itemData.moduleId"
    :itemData="itemData"
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
    itemData?: IItemData;
    flag = false;

    created() {
      if (Singleton.payload) {
        this.itemData = Singleton.payload.items[this.itemId];
        this.$set(this, "itemData", this.itemData);
        this.flag = true;
      } else {
        Singleton.itemsRef.doc(this.itemId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            Singleton.itemsRef.doc(this.itemId).set({
              moduleId: "Box"
            });
            return;
          }

          this.itemData = <IItemData>snap.data();
          this.$set(this, "itemData", this.itemData);
          this.flag = true;
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
