<template lang="pug">
UniversalPage(:pageData="localPageData")
</template>

<script lang="ts">
import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import UniversalPage from "~/pages/_universal.vue";
import {Page} from "~/molle/module/Page";
import {lsStore} from "~/utils/store-accessor";

@Component({
  components: {UniversalPage},
})
export default class StaticPageLv2 extends Page {
  async asyncData(context: any) {
    lsStore.updatePayload(context.payload);
  }
}
</script>

<style lang="scss">
</style>
