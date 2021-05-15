<template lang="pug">
component(
  v-if="itemData.moduleId",
  :is="itemData.moduleId",
  :itemData="itemData"
)

</template>

<script lang="ts">
import {Component, Vue, Prop} from "~/node_modules/nuxt-property-decorator";
import {Singleton} from "~/molle/Singleton";
import {IItemData, IPageData} from "~/molle/interface";

@Component({
  components: {}
})
export default class PageDataConverter extends Vue {

  @Prop() convert!: any;
  @Prop() override!: IItemData;

  @Prop({default: () => ({})}) pageDataByEditer?: any;// use editer.vue

  itemData: any = {class: {}, option: {}, moduleId: "", id: ""};

  async fetch() {
    let func = (pageData: any) => {
      // console.log(pageData)
      let itemData: any = Object.assign(this.itemData, this.override);

      for (let toKey in this.convert) {
        let fromKey = this.convert[toKey];
        // console.log(key, v)
        if (Array.isArray(fromKey)) {
          itemData[toKey] = pageData[
            fromKey.find((item) => !!pageData[item])
            ] || "not find";
        } else {
          itemData[toKey] = pageData[fromKey];
        }
      }
      // console.log("-------------------",itemData)
      this.$set(this, "itemData", itemData);
    };
    //
    if (this.pageDataByEditer.itemId) {
      func(this.pageDataByEditer)
    } else if (process.env.isMolleCms) {
      Singleton.getCurrentPageData(this.$route)
        .then(func);
    } else {
      func(this.$nuxt.context.payload.pageData)
    }
  }
}
</script>

<style lang="scss">

</style>
