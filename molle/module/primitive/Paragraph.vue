<template lang="pug">
p.module.paragraph(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-html="itemData.value || itemData.superValue || ''"
)
</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class Paragraph extends Module {
}
</script>

<style lang="scss">
.paragraph {
  &.-caption {
    font-size: 14px;
    color: $color-gray-500;
  }
}
</style>
