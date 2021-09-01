<template lang="pug">
.module.embed(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-html="itemData.value || itemData.superValue || ''"
)
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Embed extends Module {
}
</script>

<style lang="scss">
</style>
