<template lang="pug">
.l-body.news-detail
  GlobalHeaderComp
  article.l-content
    .container
      //p.news-detail__date(v-html="localPageData.date")
      PageTitle(:pageDataByEditer="pageDataByEditer")
      PageLoader(:pageDataByEditer="pageDataByEditer")

  GlobalFooterComp
</template>

<script lang="ts">
import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import {Utils} from "~/molle/Utils";

@Component({
  components: {},
})
export default class NewsDetailPage extends Vue {
  @Prop({default: () => ({})}) pageDataByEditer?: any;// use editer.vue

  head() {
    return Utils.setMeta(this);
  }
}
</script>

<style lang="scss">
.news-detail {
  &__date {
  }

}
</style>
