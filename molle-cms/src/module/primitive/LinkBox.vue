<template lang="pug">
a.module.link-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  :href="itemData.option.href"
  :target="itemData.option.target"
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`LinkBox`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class LinkBox extends Module {
  static readonly CLASS_NAME = "LinkBox";
}
</script>

<style lang="scss">
.link-box {
  display: block;
  height: 100%;
}
</style>
