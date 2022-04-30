<template lang="pug">
.module.list-box.box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`ListBox`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
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
  //margin-top: 0;
  .list {
    padding-left: 1.5rem;
    //default(=disc)
    > *:first-child:before {
      @include icon-dot;
      position: absolute;
      transform: translateX(-100%);
      margin-left: -0.5rem;
    }

    &:last-child {
      margin-bottom: 1.5rem;
    }
  }

  //theme

  &.-number {
    .list {
      &:first-of-type {
        counter-reset: a;
      }

      > *:first-child:before {
        counter-increment: a;
        content: counters(a, "-") ".";
        font-family: inherit;
      }
    }
  }

  &.-disc {
    .list > *:first-child:before {
      @include icon-dot;
    }
  }

  &.-none, &.t-step {
    .list {
      padding-left: 0;

      & > *:first-child:before {
        display: none;
      }
    }
  }

  // Step
  &.t-step {
    .list {
      @include mediaquery-not-sm {
        width: 60%;
      }
      position: relative;
      border: 2px solid $color-black;
      background-color: $color-white;
      //padding-top: 4rem;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 6rem;
      @include mediaquery-not-sm {
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
      }
      @include mediaquery-sm {
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      &:first-of-type {
        counter-reset: a;
      }

      &:before {
        counter-increment: a;
        content: "STEP" counters(a, "-");
        font-family: inherit;
        background-color: $color-black;
        border-radius: 50%;
        color: $color-white;
        width: 90px;
        height: 90px;
        position: absolute;
        top: -1.5rem;
        font-size: 20px;
        transform: translateX(0);
        margin-left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        @include mediaquery-not-sm {
          left: -1.5rem;
        }
        @include mediaquery-sm {
          left: -1rem;
        }
      }

      &:after {
        content: "";
        background-image: url("/img/arrow.svg");
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        display: block;
        width: 100%;
        height: 6rem;
        position: absolute;
        left: 0;
        bottom: -5rem;
      }

      &:last-child {
        margin-bottom: 2rem;

        &:after {
          display: none;
        }
      }
    }
  }
}
</style>
