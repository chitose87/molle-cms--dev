<template lang="pug">
  .scroll-trans-anchor(
    :data-value="itemData.value"
    :data-sp="itemData.option.sp"
    :data-alt="itemData.option.alt"
  )
    p(v-if="$route.query.edit") {{itemData.value}}
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";
// import ScrollTransFiexdBg from "./ScrollTransFiexdBg.vue";

@Component({
  components: {},
})
export default class ScrollTransAnchor extends Module {
  static readonly CLASS_NAME = "ScrollTransAnchor";

  mounted() {
    // ScrollTransFiexdBg.anchors.push(this);
  }
}
</script>

<style lang="scss">
.scroll-trans-anchor {
  position: absolute;
  z-index: $zindex-modal - 2;
  //width: 100%;
  //border: 2px solid red;
}
</style>
