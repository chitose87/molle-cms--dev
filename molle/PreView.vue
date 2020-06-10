<template lang="pug">
  .editView
    .container
      component(
        v-for="key in payload.allData.pages[payload.id].items"
        :key="key"
        :is="payload.allData.outlines[payload.allData.items[key].moduleId].name"
        :itemData="payload.allData.items[key]"
        :valueData="payload.allData.values[key]"
        :styleData="payload.allData.styles[key]"
      )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {setMolleModules} from "~/molle/ssr/module";

  @Component({
    components: {}
  })
  export default class PreView extends Vue {
    setMolleModules = setMolleModules();
    @Prop() payload?: {
      id: string,
      allData: {
        pages: any,
        outlines: any,
        items: any,
        values: any,
        styles: any
      }
    };
  }
</script>

<style lang="scss">

</style>
