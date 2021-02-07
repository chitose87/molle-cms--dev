<template lang="pug">
.module.picture(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  picture
    source(
      media="(max-width:" + (process.env.breakPoint - 1) + "px)"
      :srcset="itemData.option.sp",
      :alt="itemData.option.alt"
    )
    img(:src="itemData.value", :alt="itemData.option.alt")
</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class Picture extends Module {
  //Unique Methods
}
</script>

<style lang="scss">
.picture {
  img {
    width: 100%;
    height: auto;
  }
}
</style>
