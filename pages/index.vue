<template lang="pug">
.l-body.top
  GlobalHeaderComp
  main
    ModuleLoader(:node="{id:'top-content'}")

    button(@click="count+=1")
      span(v-html="count")

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
import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";

@Component({
  components: {},
})

export default class Index extends Vue {
  count = 1;

  // payload = {};
  // async asyncData(context: any) {
  //   lsStore.updatePayload(context.payload);
    //payload と　state両方に来ちゃう
  // }

  hoge(){
    //return lsStore.payload;
  }

  // async ay() {
  //   // console.log("fetch");
  //   lsStore.updatePayload(this.$nuxt.context.payload);
  //   // //staticではよばれない
  //   // if (this.$nuxt.context.payload) {
  //   //   // this.payload = this.$nuxt.context.payload;
  //   //   this.payload = {test: "hoge"}
  //   // }
  // }
}
</script>

<style lang="scss">
.top {

}
</style>
