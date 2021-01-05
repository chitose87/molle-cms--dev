<template lang="pug">
  p.module(
    :id="itemData.tagId"
    v-html="itemData.value || itemData.superValue || ''"
  )
  //  v-if="itemData"
  //  :class="getClass(itemData)"
  //  :style="getStyle(itemData)"
  //  :data-item-id="itemData.id"

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/src/module/Module";

  @Component({
    components: {}
  })
  export default class Paragraph extends Module {
  }
</script>

<style lang="scss">
</style>
