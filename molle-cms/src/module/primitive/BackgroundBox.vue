<template lang="pug">
component.module.background-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  picture
    source(
      :media="`(max-width:${breakPoint - 1}px)`"
      :srcset="itemData.option.bgSp",
      :alt="itemData.option.alt"
    )
    img.background-box__bg(
      loading="lazy"
      :src="itemData.option.bg"
      :alt="itemData.option.alt"
      )

  .background-box__body.box
    ModuleLoader(
      v-for="node in itemData.value",
      :key="node.id",
      :node="node"
    )

  AddModuleComp(
    :label="`BG-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class BackgroundBox extends Module {
  static readonly CLASS_NAME = "BackgroundBox";
  breakPoint = process.env.breakPoint;
}
</script>

<style lang="scss">
.background-box {
  margin-top: 1rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 0;

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    object-fit: cover;
    object-position: center center;
    z-index: -1;
  }

  &__body {
    padding: $gutter/2;
  }

  //thema

  // color
  &.-dark {
    background-color: $color-black;
    color: $color-text-white;
    text-shadow: $shadow-text-black;

    > .background-box__body {
    }
  }
}
</style>
