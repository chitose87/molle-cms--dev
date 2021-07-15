<template lang="pug">
.module.link-picture(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
)
  picture
    source(
      media="(max-width:" + (process.env.breakPoint - 1) + "px)"
      :srcset="itemData.option.sp",
      :alt="itemData.option.alt"
    )
    a(:href="itemData.option.href")
      img(:src="itemData.value", :alt="itemData.option.alt")
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class LinkPicture extends Module {
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
