<template lang="pug">
  div
    h1 lv2 ssg
    p(v-html="pageId")
    p(v-html="pageData")

    .container
      ModuleLoader(:itemId="pageData.itemId")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IPageData} from "~/molle/interface";
  import {Singleton} from "~/molle/Singleton";

  @Component({
    components: {}
  })
  export default class StaticPageLv2 extends Vue {
    pageId!: string;
    pageData!: IPageData;

    async asyncData(context: any) {
      Singleton.payload = context.payload;
      return {
        pageId: context.payload.id,
        pageData: context.payload.pages[context.payload.id]
      };
    }

    created() {
    }

    init() {
    }
  }
</script>

<style lang="scss">

</style>
