<template lang="pug">
.module.anchor-navi(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .anchor-navi__body
    ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

  AddModuleComp.col-12(
    :label="`AnchorNavi`",
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
export default class AnchorNavi extends Module {
  static readonly CLASS_NAME = "AnchorNavi";
}
</script>

<style lang="scss">
.anchor-navi {
  text-align: center;

  &__body {
    display: inline-block;
    background-color: $color-gray-200;
    padding-top: 2rem;
    padding-left: 3rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
  }

  .button {
    margin-bottom: 1rem;
    font-size: 16px;
    margin-right: 2rem;

    &:after {
      @include icon-down-open;
    }
  }
}
</style>
