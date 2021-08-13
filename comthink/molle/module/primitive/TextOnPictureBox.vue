<template lang="pug">
component.module.text-on-picture-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)

  ModuleLoader(v-if="!itemData.option.reverse", :node="itemData.value.img", :key="itemData.value.img.id")
  ModuleLoader(v-if="!itemData.option.reverse", :node="itemData.value.textBox", :key="itemData.value.textBox.id")

  ModuleLoader(v-if="itemData.option.reverse", :node="itemData.value.textBox", :key="itemData.value.textBox.id")
  ModuleLoader(v-if="itemData.option.reverse", :node="itemData.value.img", :key="itemData.value.img.id")


</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class TextOnPictureBox extends Module {
  getClass() {
    let obj = super.getClass(this.itemData);

    if (this.itemData.option.reverse) {
      obj["reverse"] = true;
    }
    return obj;
  }

}

</script>

<style lang="scss">

.text-on-picture-box {
  display: flex;
  position: relative;
  margin-bottom: 3rem;

  > div:nth-child(1) {
    width: 50%;
    margin-left: 2rem;

  }

  > div:nth-child(2) {
    width: 50%;
    @include mediaquery-not-sm {
      margin-left: -7rem;
    }
    @include mediaquery-sm {
      margin-left: -7rem;
    }

  }

}

</style>
