<template lang="pug">
component.module.paragraph(
  :id="itemData.tagId",
  :is="itemData.option.tag || 'p'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-html="$getText(itemData.value || itemData.superValue || '')"
)
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class Paragraph extends Module {
  static readonly CLASS_NAME = "Paragraph";
}
</script>

<style lang="scss">
.paragraph {
  //margin-top: 0;
  margin-bottom: 1rem;

  &.-caption {
    font-size: 14px;
    color: $color-gray-700;
  }

  //color
  &.-white {
    color: $color-white;
  }

  //
  & + .picture {
    margin-top: 3rem;
  }
}
</style>
