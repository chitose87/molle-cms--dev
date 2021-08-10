<template lang="pug">
component.module.text-by-picture-box(
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
export default class TextByPictureBox extends Module {
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

.text-by-picture-box {
  display: flex;
  position: relative;

  > div:nth-child(1) {
    margin-left: 2rem;
    margin-right: 3rem;
    width: 40%;
    //margin-left: 2rem;

  }

  > div:nth-child(2) {
    width: 40%;
    //@include mediaquery-not-sm {
    //  margin-left: -7rem;
    //}
    //@include mediaquery-sm {
    //  margin-left: -7rem;
    //}
  }

}

</style>
