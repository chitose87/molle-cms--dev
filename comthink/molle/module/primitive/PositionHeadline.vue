<template lang="pug">
component.module.position-headline(
  :id="itemData.tagId",
  :is="itemData.option.lv || 'h1'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  span(v-html="itemData.value || itemData.superValue || ''")
  span.headline__sub(
    v-if="itemData.option.text",
    v-html="itemData.option.text"
  )
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class PositionHeadline extends Module {
  @Prop() static__value?: string;
}
</script>

<style lang="scss">
.position-headline {
  position: absolute;
  top: 48%;
  right: 10%;
  font-size: 4.1vw;
  line-height: 130%;

  &.text-white {
    color: $color-text-white;
  }

  &__sub {
    display: block;
    font-size: 75%;
  }
}

</style>
