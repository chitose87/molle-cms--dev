<template lang="pug">
  div
    PreView(:payload="payload")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import content from "~/store/content";
  import PreView from "~/molle/PreView.vue";

  @Component({
    components: {PreView}
  })
  export default class DynamicPage1 extends Vue {
    payload?:any;

    async asyncData(context: any) {
      let payload = context.payload;
      // if (!payload.allData.isTree) {
      // payload.allData.values = content.updateTree(payload.allData.values);
      // payload.allData.outlines = Object.assign(payload.allData.outlines, content.presetOutlines);
      // payload.allData.isTree = true;
      // console.log(payload.allData);
      // }
      return {payload: payload};
    }
  }
</script>

<style lang="scss">

</style>
