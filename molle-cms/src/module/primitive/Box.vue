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

  AddModuleComp(
    :label="`Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class Box extends Module {
  static readonly CLASS_NAME = "Box";
}
</script>

<style lang="scss">
.box {
  //margin-top: 1rem;
  //margin-bottom: 3rem;

  //> *:first-child {
  //  margin-top: 0;
  //}

  //todo
  // line-heightの差分を上げる
  //h2, h3, h4, h5 {
  //  &:first-child {
  //    margin-top: -0.2em;
  //  }
  //}

  //> *:last-child {
  //  margin-bottom: 0;
  //}

  &.t-quote {
    background-color: $color-gray-200;
    padding: 2rem 1rem;
    position: relative;
    margin-bottom: 2rem;

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

  &.t-border {
    border: 2px solid $color-black;
    //background-color: $color-white;
    margin-bottom: 2rem;
  }

  &.c-secondary {
    background-color: $color-gray-100;
    margin-bottom: 2rem;

    //@at-root .container & ,.section__body & {
    //  @include mediaquery-not-sm {
    //    margin-left: -2rem;
    //    margin-right: -2rem;
    //  }
    //
    //  @include mediaquery-sm {
    //    margin-left: -1rem;
    //    margin-right: -1rem;
    //  }
    //}
  }

  &.c-light {
    background-color: $color-white;
    margin-bottom: 2rem;
  }

  &.t-line {
    border: 6px solid $color-border-light;
    //background-color: $color-white;
    margin-bottom: 2rem;
  }

  @include mediaquery-not-sm {
    &[class*="t-read-size"] {
      max-width: ($rem * 4.5 * 8) + ($gutter * 7) + ($gutter * 2);
      margin-left: auto;
      margin-right: auto;
    }

    &.t-read-size--left {
      margin-left: 0;
    }

    &.t-read-size--rigth {
      margin-right: 0;
    }
  }
}
</style>
