<template lang="pug">
Headline(
  :static__value="value || pageDataByEditer.displayTitle || pageDataByEditer.title || pageData.displayTitle || pageData.title || '汎用固定ページ'",
  :static__option="{lv: 'h2'}"
)

</template>

<script lang="ts">
import {Component, Vue, Prop} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";

@Component({
  components: {}
})
export default class PageTitle extends Vue {
  static MOLLE_DELETE_WITH_STATIC_MODE = true;

  @Prop({default: () => ({})}) pageDataByEditer?: any;// use editer.vue
  @Prop() value?: string;// use static force
  pageData: any = {};
  private unsubscribe!: () => void;

  created() {
    if (this.$nuxt.context.isDev || process.env.isMolleCms) {
      // dev
      console.log("--------",this.pageDataByEditer.itemId)
      if (this.pageDataByEditer.itemId) return;
      Singleton.getCurrentPageData(this.$route)
        .then((pageData: any) => {
          this.$set(this, "pageData", pageData)
        });
    } else {
      // gen
      this.$set(this, "pageData", this.$nuxt.context.payload.pageData);
    }
  }
}
</script>

<style lang="scss">

</style>
