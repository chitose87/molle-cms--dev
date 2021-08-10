<template lang="pug">
component.module.text-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class TextBox extends Module {
}
</script>

<style lang="scss">
.text-box {
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 10;

  @include mediaquery-not-sm {
    margin-top: 5rem;
    padding: $gutter*1;
  }
  @include mediaquery-sm {
    margin-top: 5rem;
    padding: $gutter*1;
  }

  &.-side-by-side{
    background: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include mediaquery-not-sm {
      margin-top: 0;
      margin-left: 0;
      padding: $gutter*1.5;
    }
    @include mediaquery-sm {
      margin-top: 0;
      margin-left: 0;
      padding: $gutter*1.5;
    }
  }

  .module.button {
    display: block;
    text-align: right;
  }

}
</style>
