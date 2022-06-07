<template lang="pug">
  .float(
    :id="itemData.tagId",
    :class="getClass(itemData)",
    :style="getStyle(itemData)"
  )

    ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

    AddModuleComp(
      :parentNode="loader.node"
      :label="`Modal`"
    )
</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Float extends Module {
  static readonly CLASS_NAME = "Float";
}
</script>

<style lang="scss">
.float {
  position: fixed;
  top: 50%;
  right: 0;
  background-color: $color-white;
  box-shadow: $box-shadow;
  padding: $gutter*1px;
  z-index: $zindex-named-page-top - 1;
  @at-root [data-molle-edit] + * & {
    position: relative;
    top: inherit;
    left: inherit;
    z-index: inherit;
  }
}
</style>
