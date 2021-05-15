<template lang="pug">
div
  ModuleLoader(v-if="itemId" :node="{id:itemId}")
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch,} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";
import {IPageData, INodeObject} from "~/molle/interface";

@Component({
  components: {},
})
export default class PageLoader extends Vue {
  /**
   * SSGの際にapp.jsから削除されるoption
   */
  // static MOLLE_DELETE_WITH_STATIC_MODE = true;
  @Prop({default: () => ({})}) pageDataByEditer?: any;// use editer.vue

  itemId: string = "";

  async fetch() {
    if (this.pageDataByEditer.itemId) {
      this.itemId = this.pageDataByEditer.itemId;
    } else if (process.env.isMolleCms) {
      Singleton.getCurrentPageData(this.$route)
        .then((pageData: any) => {
          console.log(pageData.itemId)
          // this.$set(this, "itemId", pageData.itemId);
          this.itemId = pageData.itemId
        });
    } else {
      this.itemId = this.$nuxt.context.payload.pageData.itemId;
    }
  }
}
</script>

<style lang="scss">
</style>
