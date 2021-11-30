<template lang="pug">
.l-body.privacy-policy(:class="pageData.theme?'theme--'+pageData.theme:''")
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
export default class PrivacyPolicyPage extends Vue {
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
.privacy-policy {
  .-number {
    > .list {
      margin-bottom: 3rem;

      > *:first-child:before {
        content: "第" counter(a) "条";
        position: static;
        margin-left: -1.5rem;
        font-family: inherit;
      }
    }
  }
}
</style>
