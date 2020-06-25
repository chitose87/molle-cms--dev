<template lang="pug">
  .item-option-add-module
    form(@submit.prevent @submit="pushModule()")
      select(v-model="pushModuleSelected")
        option(v-for="(item,key) in molleModules" :value="key" v-html="key")
      button.btn.btn-primary(type="submit") Module追加

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import * as firebase from "~/node_modules/firebase";
  import {InitialValue, molleEditerModules} from "~/molle/editer/module";
  import {molleModules} from "~/molle/ssr/module";
  import {Singleton} from "~/molle/Singleton";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";

  @Component({
    components: {}
  })
  /**
   */
  export default class ItemOptionAddModule extends Vue {
    molleModules = molleModules;
    @Prop() profile?: ItemOptionAddModuleProfile;

    pushModuleSelected = InitialValue.Paragraph.moduleId;

    pushModule() {
      // @ts-ignore
      let data: IItemStoreData = InitialValue[this.pushModuleSelected] || {
        moduleId: this.pushModuleSelected,
        option: {}
      };

      firebase.firestore().collection("items")
        .add(data)
        .then((ref: firebase.firestore.DocumentReference) => {
          data.ref = ref;
          Singleton.store.items[ref.id] = data;
          this.profile!.added(ref);
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
