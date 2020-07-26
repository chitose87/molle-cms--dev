<template lang="pug">
  Box(
    :itemDataProp="payload.items[payload.pages[payload.id].main]"
    :payload="payload"
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
    @Prop() payload?: any;
  }
</script>

<style lang="scss">

</style>
