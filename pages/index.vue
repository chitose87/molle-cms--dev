<template lang="pug">
.l-body.top
  GlobalHeaderComp
  main
    ModuleLoader(:node="{id:'top-content'}")

    section
      .container
        h3 News
        NewsList(:max="3")

        .text-center
          Button.-primary(
            :static__value="'more'"
            :static__option="{href: '/news', traget: '_self'}"
          )

  GlobalFooterComp
</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import {Page} from "~/molle/module/Page";
import {lsStore} from "~/utils/store-accessor";

@Component({
  components: {
  },
})
export default class Index extends Page {
  async asyncData(context: any) {
    lsStore.updatePayload(context.payload);
  }

  created() {
  }

  beforeDestroy() {
  }
}
</script>

<style lang="scss">
.top {

}
</style>
