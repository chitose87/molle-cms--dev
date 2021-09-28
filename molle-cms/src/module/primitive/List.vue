<template lang="pug">
component.module.list(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ul
    li(v-for="node in itemData.value")
      ModuleLoader(
        :key="node.id",
        :node="node"
      )

  AddModuleComp(
    :label="`List`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class List extends Module {
  static readonly CLASS_NAME = "List";
}
</script>

<style lang="scss">
.list {
  padding: 0 2rem 0 2rem;
  counter-reset: item-number;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

}
</style>
