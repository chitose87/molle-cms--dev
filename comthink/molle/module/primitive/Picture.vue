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
      :alt="itemData.option.alt"
    )
    img(:src="itemData.value", :alt="itemData.option.alt")
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Picture extends Module {
  breakPoint = process.env.breakPoint;
  //Unique Methods
}
</script>

<style lang="scss">
.picture {
  img {
    height: auto;
    @include mediaquery-not-sm {
      width: 80%;
    }
    @include mediaquery-sm {
      width: 100%;
    }
  }

  // theme
  &.-sm {
    img {
      @include mediaquery-not-sm {
        width: 50%;
      }
      @include mediaquery-sm {
        width: 80%;
      }
    }
  }

  &.-lg {
    img {
      @include mediaquery-not-sm {
        width: 100%;
      }
      @include mediaquery-sm {
        width: 100%;
      }
    }
  }
}
</style>
