<template lang="pug">
div(v-show="target")
  img(:src="target" @load="loaded")

</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "nuxt-property-decorator";
import {OptionComp} from "./OptionComp";

@Component({
  components: {},
})
/**
 * 画像のサイズを取得して記録
 */
export default class ImageChecker extends OptionComp {
  @Prop() target?: string;

  loaded(e: any) {
    let img = <HTMLImageElement>e.target;
    if (this.localValue.w != img.naturalWidth ||
      this.localValue.h != img.naturalHeight) {
      this.$set(this, "localValue", {w: img.naturalWidth, h: img.naturalHeight});
      this.$emit("change");
    }
    // console.log(img);
  }
}
</script>

<style lang="scss">
</style>
