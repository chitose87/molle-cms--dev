<template lang="pug">
  a.button(
    :id="itemData.tagId",
    :class="getClass(itemData)",
    :style="getStyle(itemData)",
    :href="itemData.option.href",
    v-scroll-to="itemData.option.href.substr(0,1)=='#'?itemData.option.href:false"
    :target="itemData.option.target"
  )
    span(v-html="$getText(itemData.value)")
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Button extends Module {
  static readonly CLASS_NAME = "Button";
  @Prop() static__value?: string;
  //@Prop() static__option?: {href: "", target: ""};
}
</script>

<style lang="scss">
.button {
  cursor: pointer;
  position: relative;
  //color: $color-text-black;
  display: inline-block;
  max-width: 100%;
  transition: all $tick $easeIn;

  //default
  @include mediaquery-not-sm {
  }
  @include mediaquery-sm {
  }

  &:after {
    @include icon-right-open;
    display: inline-block;
    margin-left: 0.5em;
    transition: transform $tick/2 $easeIn;
  }

  &:hover {
    color: $color-text-white;
    text-decoration: underline;
    //transition-timing-function: $easeOut;

    &:after {
      //transform: translateX(4px);
      //transition-timing-function: $easeOut;
    }
  }

  // color
  &.c-white {
    color: $color-text-white;

    &:hover {
      color: $color-link;
    }
  }

  &.-primary, &.-secondary {
    @include font-style;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: transparent;
    border: solid 3px $color-gray-900;
    padding: 1rem 2rem;
    text-decoration: none;
    font-weight: 500;

    @include mediaquery-not-sm {
    }
    @include mediaquery-sm {
    }

    span {
    }

    &:after {
      display: inline-block;
      line-height: 1;
    }

    // スモール
    &.-sm {
      @include mediaquery-not-sm {
        min-width: 6rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      @include mediaquery-sm {
        min-width: 4rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
    }

    // ラージ
    &.-lg {
      @include mediaquery-not-sm {
        min-width: 20rem;
        min-height: 40px;
        //padding: 1.5rem 1rem;
      }
      @include mediaquery-sm {
        min-width: 15rem;
        min-height: 50px;
        //padding: 1rem 1rem;
      }
    }
  }

  //block
  &.block {
    display: flex;
  }

  // color
  &.-primary {
    background-color: $color-gray-900;
    border-color: $color-white;
    color: $color-text-white;

    &:hover {
      background: rgba($color-gray-900, 0.2);
      border-color: $color-white;
    }
  }

  &.-secondary {
    color: $color-text-white;
    background: $color-black;

    &:hover {
      border-color: $color-black;
      background: $color-white;
      color: $color-text-black;
    }

    //
    &.-lg {
      @include mediaquery-not-sm {
        border-radius: 25px;
      }
      @include mediaquery-sm {
        border-radius: 25px;
      }
    }
  }

  // theme
  &.-sm {
    @include mediaquery-not-sm {
      font-size: 14px;
    }
    @include mediaquery-sm {
      font-size: 14px;
    }
  }

  &.-lg {
    @include mediaquery-not-sm {
      font-size: 17px;
    }
    @include mediaquery-sm {
      font-size: 17px;
    }
  }

  //
  &:focus,
  &.focus {
    cursor: default;
  }

  &.disabled,
  &:disabled {
    opacity: 0.3;
    filter: grayscale(100%);
    pointer-events: none;
  }

  &[target="_blank"] {
    &:after {
      @include icon-blank;
    }
  }
}
</style>
