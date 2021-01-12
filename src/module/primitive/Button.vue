<template lang="pug">
  .module.button(
    :id="itemData.tagId"
    :class="getClass(itemData)"
    :style="getStyle(itemData)"
  )
    a.btn(
      :href="itemData.value.href"
      :target="itemData.value.target"
    )
      span(v-html="itemData.value.label")

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/src/module/Module";

  @Component({
    components: {}
  })
  export default class Button extends Module {
  }
</script>

<style lang="scss">
</style>
