<template lang="pug">
.l-body.top
  GlobalHeaderComp
  MolleEditerComp
  main
    ModuleLoader(:node="{id:'embed%2Ftop'}" :isRoot="true")

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
import {Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {},
})

export default class Index extends Vue {
}
</script>

<style lang="scss">
.top {
  .overlay{
    background-color: rgba(255, 255, 255, 0.8);
    position: relative;
    z-index: 10;
    margin: -4rem 7% 8rem;
    padding: 3.9%;
    border: 1px solid #A09B97;
    text-align: center;
  }
}
</style>
