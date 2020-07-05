<template lang="pug">
  div
    .container
      Box(
        :itemDataProp="payload.items[payload.pages[payload.id].main]"
        :payload="payload"
      )
      //component(
      //  v-for="key in payload.allData.pages[payload.id].items"
      //  :key="key"
      //  :is="payload.allData.outlines[payload.allData.items[key].moduleId].name"
      //  :itemData="payload.allData.items[key]"
      //)

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {setMolleModules} from "~/molle/ssr/module";

  @Component({
    components: {}
  })
  export default class PreView extends Vue {
    setMolleModules = setMolleModules();
    @Prop() payload?: any;
  }
</script>

<style lang="scss">

</style>
