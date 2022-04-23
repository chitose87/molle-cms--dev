<template lang="pug">
  .l-body.universal(:class="pageData.theme?'theme--'+pageData.theme:''")
    GlobalHeaderComp
    MolleEditerComp
    main
      article.l-content
        //MainVisual(:pageData="pageData")
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

.mv {
  height: 100vh;
  background-color: $color-gray-900;
  display: flex;
  justify-content: center;
  align-items: center;

  .section__body {
    width: 64%;

  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: start;
    font-size: 18px;
    margin-top: 10rem;

    p {
      background-color: rgba($color-black, 0.8);
      display: inline-block;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      backdrop-filter: blur(10px);
    }
  }
}

section {
  p {
    text-shadow: 0 0px 15px rgba(0, 0, 0, 1);
  }
}
</style>

