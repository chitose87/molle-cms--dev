<template lang="pug">
a.module.link-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  :href="$route.query.edit ? 'javascript:void(0)' : itemData.option.href"
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
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class LinkBox extends Module {
}
</script>

<style lang="scss">
.link-box {
  display: block;
}
</style>
