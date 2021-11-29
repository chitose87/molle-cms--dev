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
import {Module} from "../Module";

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
  color: $color-text-black;
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
    color: $color-link;
    text-decoration: underline;
    transition-timing-function: $easeOut;

    &:after {
      transform: translateX(4px);
      transition-timing-function: $easeOut;
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
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: transparent;
    line-height: 1.5;
    border: solid 2px $color-text-black;
    color: $color-text-black;
    padding: 0.5rem 2rem;
    text-decoration: none;

    font-weight: 500;
    font-size: 14px;

    @include mediaquery-not-sm {
      letter-spacing: 2.5px;
    }
    @include mediaquery-sm {
      letter-spacing: 1px;
    }

    //&:hover {
    //  transition-timing-function: $easeOut;
    //  text-decoration: none;
    //}

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

      &:before {
        border-radius: 3px;
      }
    }

    // ラージ
    &.-lg {
      @include mediaquery-not-sm {
        min-width: 23rem;
        min-height: 50px;
        //padding: 1.5rem 1rem;
      }
      @include mediaquery-sm {
        min-width: 15rem;
        min-height: 50px;
        //padding: 1rem 1rem;
      }

      &:before {
        border-radius: 5px;
      }
    }
  }

  //block
  &.block {
    display: flex;
  }

  // color
  &.-primary {
    background: $color-white;
    border-radius: 2px;

    &:hover {
      border-color: $color-black;
      background: $color-black;
      color: $color-text-white;
    }
  }

  &.-secondary {
    color: $color-text-white;
    background: $color-black;
    border-radius: 20px;

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
