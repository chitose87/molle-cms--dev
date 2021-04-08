<template lang="pug">
.l-body.universal
  GlobalHeaderComp
  article.l-content
    .container
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
export default class UniversalPage extends Vue {
  @Prop({default: () => ({})}) pageDataByEditer?: any;// use editer.vue

  head() {
    return Utils.setMeta(this);
  }
}
</script>

<style lang="scss">
.universal {
}
</style>

