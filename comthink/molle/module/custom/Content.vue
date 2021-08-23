<template lang="pug">
component.module.content(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
)

  div.overlap-text-box
    ModuleLoader(:node="itemData.value.headline" :key="itemData.value.headline.id")
    ModuleLoader(:node="itemData.value.text" :key="itemData.value.text.id")
    ModuleLoader(:node="itemData.value.btn" :key="itemData.value.btn.id")
  div.overlap-img
    ModuleLoader(:node="itemData.value.img" :key="itemData.value.img.id")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Content extends Module {
}
</script>

<style lang="scss">
</style>
