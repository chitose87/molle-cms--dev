<template lang="pug">
.l-body.universal
  GlobalHeaderComp
  article.l-content
    Headline(
      :static__value="pageData.displayTitle||pageData.title"
      :static__option="{lv:'h2'}"
    )
    ModuleLoader(v-if="pageData.itemId" :node="{id:pageData.itemId}")

  GlobalFooterComp
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Utils} from "~/molle/Utils";
import {IPageData} from "~/molle/interface";

@Component({
  components: {},
})
export default class UniversalPage extends Vue {
  @Prop({default: () => ({})}) pageDataByEditer?: any;// use editer.vue
  pageData = <IPageData>{};

  async fetch() {
    this.$set(this, "pageData", await Utils.getPageData(this) || this.pageDataByEditer);
  }

  head() {
    return Utils.setMeta(this.pageData || this.pageDataByEditer);
  }
}
</script>

<style lang="scss">
.universal {
}
</style>

