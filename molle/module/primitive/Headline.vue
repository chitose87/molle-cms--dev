<template lang="pug">
  component.module.headline(
    :id="itemData.tagId"
    :is="itemData.option.lv || 'h3'"
    :class="getClass(itemData)"
    :style="getStyle(itemData)"
    v-html="itemData.value || itemData.superValue || ''"
  )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/module/Module";

  @Component({
    components: {}
  })
  export default class Headline extends Module {
  }
</script>

<style lang="scss">
</style>
