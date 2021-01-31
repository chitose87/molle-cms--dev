<template lang="pug">
.l-body.universal
  GlobalHeaderComp
  article.l-content
    .container
      Headline(
        :static__value="localPageData.displayTitle || localPageData.title || '汎用固定ページ'",
        :static__option="{lv: 'h2'}"
      )
      ModuleLoader(:itemId="localPageData.itemId")
  GlobalFooterComp
</template>

<script lang="ts">
import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import {Page} from "~/molle/module/Page";
import {lsStore} from "~/utils/store-accessor";

@Component({
  components: {},
})
export default class UniversalPage extends Page {
  head() {
    return this.createMeta();
  }

  async asyncData(context: any) {
    lsStore.updatePayload(context.payload);
  }
}
</script>

<style lang="scss">
.universal {
}
</style>

