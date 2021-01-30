<template lang="pug">
a.module.button(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  :href="$route.query.edit ? 'javascript:void(0)' : itemData.option.href",
  :target="itemData.option.target"
)
  span(v-html="itemData.value")
</template>

<script lang="ts">
import {Component, Prop} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class Button extends Module {
  @Prop() static__value?: string;
  //@Prop() static__option?: {href: "", target: ""};
}
</script>

<style lang="scss">
.button {
  cursor: pointer;
  position: relative;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  background-color: transparent;
  border: 0;
  line-height: 1.5;
  //margin-right: 0.5rem;
  margin-bottom: 1rem;
  color: $color-text-white;
  max-width: 100%;

  &,
  &::before,
  &::after {
    transition: all 0.4s ease;
  }

  //default
  @include mediaquery-not-sm {
    font-size: 18px;
    min-width: 12rem;
    padding: 1rem 1rem;
  }
  @include mediaquery-sm {
    font-size: 16px;
    min-width: 6rem;
    padding: 1rem 1rem;
  }

  &::before {
    content: "";
    border-radius: 4px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.4s ease;
    z-index: -1;
    background: $color-black;
  }

  > span {
    @include mediaquery-not-sm {
      padding-left: 1.5em;
    }
    @include mediaquery-sm {
      font-size: 1em;
    }
  }

  &::after {
    @include icon-arrow-right();
    display: inline-block;
    margin-left: 1rem;
    position: relative;
    top: -0.1em;
    @include mediaquery-not-sm {
      font-size: 70%;
    }
    @include mediaquery-sm {
      font-size: 90%;
    }
  }

  // theme
  &.-sm {
    @include mediaquery-not-sm {
      font-size: 16px;
      min-width: 6rem;
      padding: 0.5rem 0.5rem;
    }
    @include mediaquery-sm {
      font-size: 18px;
      min-width: 4rem;
      padding: 0.5rem 0.5rem;
    }

    &:before {
      border-radius: 3px;
    }
  }

  &.-lg {
    @include mediaquery-not-sm {
      font-size: 20px;
      width: 30rem;
      padding: 1.5rem 1rem;
    }
    @include mediaquery-sm {
      font-size: 18px;
      width: 22rem;
      padding: 1rem 1rem;
    }

    &:before {
      border-radius: 5px;
    }
  }

  // color
  &.-primary {
    //color: $color-text-white;

    &:before {
      //background: $color-black;
    }
  }

  &.-secondary {
    color: $color-text;

    &:before {
      background: $color-gray-200;
    }
  }

  &.-link {
    color: $color-text;
    min-width: auto;
    padding: 0;
    font-size: inherit;
    display: inline-flex;
    align-items: center;

    &::before {
      display: none;
    }

    span {
      padding: 0;
    }

    &::after {
      @include icon-arrow-right-circle();
      color: $color-gray-500;
      font-size: 32px;
      line-height: 1;
      position: initial;
      margin-left: 0.5rem;
    }

    &:hover {
      color: $color-yellow;

      &::after {
        color: $color-yellow;
        transform: translateX(5px);
      }
    }

    &.-sm {
      @include mediaquery-not-sm {
        font-size: 12px;
      }
      @include mediaquery-sm {
        font-size: 12px;
      }
    }

    &.-lg {
      @include mediaquery-not-sm {
        font-size: 24px;
      }
      @include mediaquery-sm {
        font-size: 24px;
      }
    }
  }

  //
  &:focus,
  &.focus {
    cursor: default;
  }

  &:hover {
    color: $color-text-white;

    &::before {
      background: $color-yellow;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      transform: translate(-5px, -5px);
    }
    &::after {
      color: $color-text-white;
    }
  }

  &.disabled,
  &:disabled {
    opacity: 0.3;
    filter: grayscale(100%);
    pointer-events: none;
  }

  &[target="_blank"] {
    > span:after {
      //@include icon-blank;
      //display: inline-block;
      //margin-left: 0.25em;
      //line-height: 1;
    }
  }
}
</style>
