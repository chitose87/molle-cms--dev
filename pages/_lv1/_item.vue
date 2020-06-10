<template lang="pug">
  .hoge
    p lv0
    //p(v-html="firebaseData.path")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  // import {Context} from '@nuxt/types';

  @Component({
    components: {}
  })
  export default class DynamicPage1 extends Vue {
    // firebaseData: any;
    // async asyncData(context: Context) {
    //   return {firebaseData: context.payload}
    // }
  }
</script>

<style lang="scss">

</style>
