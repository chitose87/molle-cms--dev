<template lang="pug">
  .l-molle(v-if="pageData.itemId")
    .l-molle__left
      ItemListViewComp(:itemId="pageData.itemId")
    .l-molle__main
      h1 lv2 no-ssr
      p(v-html="pageData.itemId")
      p(v-html="pageData.path")

      .container
        ModuleLoader(:itemId="pageData.itemId")
    .l-molle__right
      p ppppppppp

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {DynamicPage} from "~/src/DynamicPage";
  import {IPageData} from "~/src/interface";
  import ItemListViewComp from "~/src/ui/ItemListViewComp.vue";

  @Component({
    layout: "molle",
    components: {ItemListViewComp}
  })
  export default class DynamicPageLv2 extends DynamicPage {
    pageData: IPageData = <IPageData>{};

    created() {
      this._mounted();
    }

    init() {
    }
  }
</script>

<style lang="scss">
  .l-molle {
    display: flex;

    &__left {

    }

    &__main {
      flex: 1;
    }

    &__right {

    }
  }
</style>
