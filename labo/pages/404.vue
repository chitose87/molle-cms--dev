<template lang="pug">
.l-body.e404
  GlobalHeaderComp
  article.l-content
    .container
      .text-center
        Button.-lg.-primary(
          :static__value="'TOPページ'"
          :static__option="{href:'/'}"
        )

  GlobalFooterComp
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class ErrorPage extends Vue {
}
</script>

<style lang="scss">
</style>

