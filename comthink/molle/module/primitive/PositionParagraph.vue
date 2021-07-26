<template lang="pug">
p.module.position-paragraph(
  :id="itemData.tagId",
  :is="itemData.option.tag || 'p'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-html="itemData.value || itemData.superValue || ''"
)
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class PositionParagraph extends Module {
}
</script>

<style lang="scss">
.position-paragraph {
  margin-top: 0;
  margin-bottom: 1rem;
  position: absolute;
  top:45%;
  right: -1%;

  &.-caption {
    font-size: 14px;
    color: $color-gray-500;
  }
}
</style>
