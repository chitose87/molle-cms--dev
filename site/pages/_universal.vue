<template lang="pug">
.l-body.universal(:class="pageData.theme?'theme--'+pageData.theme:''")
  GlobalHeaderComp
  MolleEditerComp
  main
    article.l-content
      MainVisual(:pageData="pageData")
      ModuleLoader(v-if="pageData.itemId" :node="{id:pageData.itemId}")

  GlobalFooterComp
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Utils} from "~/molle-cms/src/Utils";
import {IPageData} from "~/molle-cms/src/interface";

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

