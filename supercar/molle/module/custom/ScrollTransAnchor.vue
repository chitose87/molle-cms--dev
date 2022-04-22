<template lang="pug">
  .scroll-trans-anchor
    p hoge
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class ScrollTransAnchor extends Module {
  static readonly CLASS_NAME = "ScrollTransAnchor";
}
</script>

<style lang="scss">
.scroll-trans-anchor {

}
</style>
