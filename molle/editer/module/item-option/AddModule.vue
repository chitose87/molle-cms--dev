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
  import {molleEditerModules} from "~/molle/editer/module";
  import {molleModules} from "~/molle/ssr/module";

  @Component({
    components: {}
  })
  /**
   */
  export default class ItemOptionAddModule extends Vue {
    molleModules = molleModules;
    @Prop() profile?: ItemOptionAddModuleProfile;

    pushModuleSelected = "Paragraph";

    pushModule() {
      // @ts-ignore
      let moduleClass = molleEditerModules[this.pushModuleSelected + "E"];
      // console.log(moduleClass, this.pushModuleSelected + "E");

      let data = moduleClass.placeholder || {moduleId: this.pushModuleSelected};

      firebase.firestore().collection("items")
        .add(data)
        .then((e: firebase.firestore.DocumentReference) => {
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
