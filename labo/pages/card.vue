<template lang="pug">
div
  //GlobalHeaderComp
  MolleEditerComp
  main
    ModuleLoader.hoge(:node="{id:'card-content'}" :isRoot="true")

    //section
    //  .container
    //    h3 News
    //    NewsList(:max="3")
    //
    //    .text-center
    //      Button.-primary(
    //        :static__value="'more'"
    //        :static__option="{href: '/news', traget: '_self'}"
    //      )

  //GlobalFooterComp
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {},
})

export default class Index extends Vue {
}
</script>

<style lang="scss">
.hoge {
  @include mediaquery-sm{
  margin: 0;
  }
}
</style>
