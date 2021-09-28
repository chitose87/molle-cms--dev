<template lang="pug">
component.module.list-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(
    v-for="node in itemData.value"
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`ListBox`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class ListBox extends Module {
  static readonly CLASS_NAME = "ListBox";
}
</script>

<style lang="scss">
.list-box {
  padding: 0 2rem 0 2rem;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

}
</style>
