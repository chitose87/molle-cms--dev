<template lang="pug">
  .bootstrap.add-module
    form.form-inline(@submit.prevent @submit="pushModule()")
      select.form-control.form-control-sm(v-model="pushModuleSelected")
        option(v-for="(item,key) in molleModules" :value="key" v-html="key")
      button.btn.btn-primary.btn-sm(type="submit") Module追加

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {InitialValue} from "~/molle/editer/module";
  import {molleModules} from "~/molle/ssr/module";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";

  @Component({
    components: {}
  })
  /**
   */
  export default class AddModule extends Vue {
    molleModules = molleModules;

    pushModuleSelected = InitialValue.Paragraph.moduleId;

    pushModule() {
      // @ts-ignore
      let data: IItemStoreData = InitialValue[this.pushModuleSelected] || {
        moduleId: this.pushModuleSelected,
        option: {}
      };

      this.$emit("submit", data);
      // this.submit!(data);
    }
  }
</script>

<style lang="scss">
</style>
