<template lang="pug">
  div
    PreView(:payload="payload")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import PreView from "~/molle/PreView.vue";

  @Component({
    components: {PreView}
  })
  export default class DynamicPage2 extends Vue {
    payload?: any;

    async asyncData(context: any) {
      return {payload: context.payload};
    }
  }
</script>

<style lang="scss">

</style>
