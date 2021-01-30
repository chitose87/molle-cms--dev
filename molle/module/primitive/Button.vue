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
  line-height: 1.5;
  margin-bottom: 1rem;
  max-width: 100%;
  border: solid 1px $color-black;
  border-radius: 10px;
  color: $color-text-black;

  &:hover {
    color: $color-text-white;
    background: $color-black;
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
    color: $color-blue;
    border: solid 1px $color-blue;

    &:hover {
      background: $color-blue;
      color: $color-text-white;
    }

    > span:after {
      @include icon-right-open;
      display: inline-block;
      margin-left: 0.25em;
      line-height: 1;
    }
  }

  &.-secondary {
    color: $color-gray-600;
    border: solid 1px $color-gray-600;

    &:hover {
      background: $color-gray-600;
      color: $color-text-white;
    }

    > span:after {
      @include icon-right-open;
      display: inline-block;
      margin-left: 0.25em;
      line-height: 1;
    }
  }

  &.-link {
    color: $color-text;
    min-width: auto;
    padding: 0;
    font-size: inherit;
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;

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

  &.disabled,
  &:disabled {
    opacity: 0.3;
    filter: grayscale(100%);
    pointer-events: none;
  }

  &[target="_blank"] {
    > span:after {
      @include icon-blank;
      display: inline-block;
      margin-left: 0.25em;
      line-height: 1;
    }
  }
}
</style>
