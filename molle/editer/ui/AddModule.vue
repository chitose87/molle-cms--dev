<template lang="pug">
  .add-module.form-inline
    form(@submit.prevent @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="(item,key) in molleModules" :value="key" v-html="key")
      button.btn.btn-primary.btn-sm(type="submit") Module追加

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import * as firebase from "~/node_modules/firebase";
  import {InitialValue} from "~/molle/editer/module";
  import {molleModules} from "~/molle/ssr/module";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {lsStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  /**
   */
  export default class AddModule extends Vue {
    molleModules = molleModules;

    pushModuleSelected = InitialValue.Paragraph.moduleId;
    @Prop() added?: (ref: firebase.firestore.DocumentReference) => void;

    pushModule() {
      // @ts-ignore
      let data: IItemStoreData = InitialValue[this.pushModuleSelected] || {
        moduleId: this.pushModuleSelected,
        option: {}
      };

      firebase.firestore().collection("items")
        .add(data)
        .then((ref: firebase.firestore.DocumentReference) => {
          // data.ref = ref;
          // Singleton.store.items[id] = data;

          lsStore.updateEditing(ref.id);
          this.added!(ref);
        });
    }
  }
</script>

<style lang="scss">
</style>
