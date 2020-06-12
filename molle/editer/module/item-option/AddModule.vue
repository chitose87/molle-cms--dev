<template lang="pug">
  .item-option-add-module
    form(@submit.prevent @submit="pushModule()")
      select(v-model="pushModuleSelected")
        option(v-for="(item,key) in contentStore.outlines" :value="key" v-html="item.name+'/'+key")
      button.btn.btn-primary(type="submit") Module追加

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import * as firebase from "~/node_modules/firebase";
  import {contentStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  /**
   */
  export default class ItemOptionAddModule extends Vue {
    contentStore = contentStore;

    @Prop() profile?: ItemOptionAddModuleProfile;
    @Prop() itemData?: IItemStoreData;

    pushModuleSelected = "box";

    pushModule() {
      let ref = firebase.firestore().doc(this.itemData!.path).parent.parent;
      ref!.collection("items")
        .add({
          moduleId: this.pushModuleSelected,
          option: {},
        })
        .then((e: firebase.firestore.DocumentReference) => {
          ref!.collection("values").doc(e.id)
            .set({});
          this.profile!.added(e);
        });
    }
  }

  export class ItemOptionAddModuleProfile {
    name: string = "ItemOptionAddModule";
    added: (ref: firebase.firestore.DocumentReference) => void;

    constructor(opt: {
      added: (ref: firebase.firestore.DocumentReference) => void
    }) {
      this.added = opt.added;
    }
  }
</script>

<style lang="scss">
</style>
