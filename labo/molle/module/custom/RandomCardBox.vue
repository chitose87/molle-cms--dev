<template lang="pug">
component.module.box(
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

  //p(v-html="`lv=${itemData.option.lv} / rate=${itemData.option.rate}`")
  AddModuleComp(
    :label="`Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class RandomCardBox extends Module {
  static readonly CLASS_NAME = "RandomCardBox";
}
</script>

<style lang="scss">
.box {
  //margin-top: 1rem;
  //margin-bottom: 3rem;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  //thema
  &.-quote {
    background-color: $color-gray-100;
    padding: 2rem 1rem;
    position: relative;

    &:before,
    &::after {
      position: absolute;
      font-size: 200%;
      line-height: 1;
    }

    &::before {
      content: "“";
      left: 0.5rem;
      top: 1rem;
    }

    &::after {
      content: "”";
      right: 0.5rem;
      bottom: 0rem;
    }
  }

  // color
  &.-gray {
    background-color: $color-gray-600;
    @include mediaquery-not-sm {
      padding-top: $gutter*2;
      padding-bottom: $gutter*2;
    }
    @include mediaquery-sm {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  }

  &.-gray-box {
    border: 6px solid $color-border-light;
    padding: 1.5rem;
    background-color: $color-white;
    @include mediaquery-sm {
      padding: 1rem;
    }
  }

  &.-dark {
    background-color: $color-black;
    color: $color-text-white;
    padding-top: $gutter*2;
    padding-bottom: $gutter*2;
  }
}
</style>
