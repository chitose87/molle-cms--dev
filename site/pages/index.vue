<template lang="pug">
.l-body.top
  GlobalHeaderComp
  MolleEditerComp
  main
    ModuleLoader(:node="{id:'top-content'}")

    section
      .container
        h3 News
        //NewsList(:max="3")

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

}
</style>
