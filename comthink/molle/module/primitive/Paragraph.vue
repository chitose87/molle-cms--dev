<template lang="pug">
p.module.paragraph(
  :id="itemData.tagId",
  :is="itemData.option.tag || 'p'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-html="itemData.value || itemData.superValue || ''"
)
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class Paragraph extends Module {
}
</script>

<style lang="scss">
.paragraph {
  margin-top: 0;
  margin-bottom: 1rem;

  &.-caption {
    font-size: 14px;
    color: $color-gray-500;
  }
}
</style>
