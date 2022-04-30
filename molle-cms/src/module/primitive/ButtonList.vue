<template lang="pug">
.module.button-list(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

  AddModuleComp.col-12(
    :label="`ButtonList`",
    :parentNode="loader.node"
    :style="{width: '100%'}"
  )
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class ButtonList extends Module {
  static readonly CLASS_NAME = "ButtonList";
}
</script>

<style lang="scss">
.button-list {
  margin-right: -1rem;
  //margin-bottom: 1rem;

  &.text-left {
    justify-content: flex-start;
  }

  &.text-center {
    justify-content: center;
  }

  &.text-right {
    justify-content: flex-end;
  }

  .button {
    //margin: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
