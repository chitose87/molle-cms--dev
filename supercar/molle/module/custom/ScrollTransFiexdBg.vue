<template lang="pug">
  .scroll-trans-fiexd-bg
    p hoge
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class ScrollTransFiexdBg extends Module {
  static readonly CLASS_NAME = "ScrollTransFiexdBg";
}
</script>

<style lang="scss">
.scroll-trans-fiexd-bg {

}
</style>
