<template lang="pug">
.l-body.news-detail
  GlobalHeaderComp
  article.l-content
    .container
      p.news-detail__date(v-html="localPageData.date")

      Headline(
        :static__value="localPageData.displayTitle || localPageData.title || 'お知らせ'",
        :static__option="{lv: 'h2'}"
      )
      ModuleLoader(v-if="localPageData.itemId" :node="{id:localPageData.itemId}")

  GlobalFooterComp
</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import {Page} from "~/molle/module/Page";
import {lsStore} from "~/utils/store-accessor";

@Component({
  components: {},
})
export default class NewsDetailPage extends Page {

  head() {
    return this.createMeta();
  }

  async asyncData(context: any) {
    lsStore.updatePayload(context.payload);
  }
}
</script>

<style lang="scss">
.news-detail {
  &__date {
  }

}
</style>
