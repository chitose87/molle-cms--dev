<template lang="pug">
  component.module.box(
    :is="0||'div'"
    :id="itemData.tagId"
    :class="getClass(itemData)"
    :style="getStyle(itemData)"
  )
    ModuleLoader(
      v-for="id in itemData.value"
      :key="id"
      :itemId="id"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/src/module/Module";

  @Component({
    components: {}
  })
  export default class Box extends Module {
  }
</script>

<style lang="scss">
  .box {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
</style>
