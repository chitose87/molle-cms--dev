<template lang="pug">
  div
    h1 lv1
    p(v-html="pageData.itemId")
    p(v-html="pageData.path")

    .container
      ModuleLoader(v-if="pageData.itemId" :itemId="pageData.itemId")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {DynamicPage} from "~/src/DynamicPage";
  import {IPageData} from "~/src/interface";

  @Component({
    layout: "molle",
    components: {}
  })
  export default class DynamicPageLv1 extends DynamicPage {
    pageData: IPageData = <IPageData>{};

    created() {
      this._mounted();
    }

    init() {
    }
  }
</script>

<style lang="scss">

</style>
