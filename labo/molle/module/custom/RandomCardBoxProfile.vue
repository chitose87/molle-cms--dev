<template lang="pug">
div
  label
    span.mr-1 lv =
    span(v-html="itemData.option.lv")
    input.form-control.form-control-sm(
      v-model="itemData.option.lv"
      @change="()=>$emit('change')"
      type="range" min="1" max="10" step="1"
    )
  label
    span.mr-1 確率 =
    span(v-html="itemData.option.rate")
    input.form-control.form-control-sm(
      v-model="itemData.option.rate"
      @change="()=>$emit('change')"
      type="range" min="1" max="100" step="1"
    )

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import RandomCardBox from "~/molle/module/custom/RandomCardBox.vue";
import RandomCards from "~/molle/module/custom/RandomCards.vue";

@Component({
  components: {StyleComp},
})
export default class RandomCardBoxProfile extends Profile {
  static readonly CLASS_NAME = "RandomCardBoxProfile";
  //style setting
  stylePermission = {
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "-quote"]},
    // color: {default: "", select: ["", "-dark", "-gray", "-gray-box"]},
  };
  static settings = {
    type: "children",
    opt: {
      option: {
        lv: 3,
        rate: 50,
      },
    },
    black: [RandomCardBox,RandomCards],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
