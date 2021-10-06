<template lang="pug">
.module.picture(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  picture
    source(
      :media="`(max-width:${breakPoint - 1}px)`"
      :srcset="itemData.option.sp",
      :width="itemData.option.spSize?itemData.option.spSize.w/(itemData.option.scale||1)+'px':'auto'"
      :height="itemData.option.spSize?itemData.option.spSize.h/(itemData.option.scale||1)+'px':'auto'"
      :alt="itemData.option.alt"
    )
    img(
      :src="itemData.value",
      :width="itemData.option.size?itemData.option.size.w/(itemData.option.scale||1)+'px':'auto'"
      :height="itemData.option.size?itemData.option.size.h/(itemData.option.scale||1)+'px':'auto'"
      :alt="itemData.option.alt")
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Picture extends Module {
  static readonly CLASS_NAME = "Picture";
  breakPoint = process.env.breakPoint;
  //Unique Methods
}
</script>

<style lang="scss">
.picture {
  &:not([class*="-non-scale"]) {
    @include mediaquery-not-sm {
      width: 80%;
    }
    @include mediaquery-sm {
      width: 100%;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  &.border {
    padding: 0;
  }

  &.text-left {
    margin-right: auto;
    margin-left: 0;
  }

  &.text-center {
    margin-right: auto;
    margin-left: auto;
  }

  &.text-right {
    margin-right: 0;
    margin-left: auto;
  }

  // theme
  &.-sm {
    @include mediaquery-not-sm {
      width: 50%;
    }
    @include mediaquery-sm {
      width: 80%;
    }
  }

  &.-lg {
    @include mediaquery-not-sm {
      width: 100%;
    }
    @include mediaquery-sm {
      width: 100%;
    }
  }

  &.-non-scale {
    width: auto;

    img {
    }
  }
}
</style>
