<template lang="pug">
.card-page
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
@font-face {
  font-family: 'MyFont';
  src: url(/font/Kaisotai-Next-UP-B.woff2);
}

body {
}
.hoge {
  @include mediaquery-sm{
  margin: 0;
  }
}
.card-page{
  background-color: black;
  .hoge{
    font-family: MyFont;

  }
}
</style>
