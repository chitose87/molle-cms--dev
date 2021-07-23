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
import StyleComp from "molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "molle-cms/src/module/Profile";

@Component({
  components: {StyleComp}
})
export default class RandomCardBoxProfile extends Profile {
  //style setting
  stylePermission = {
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "-quote"]},
    // color: {default: "", select: ["", "-dark", "-gray", "-gray-box"]},
  };
}
</script>

<style lang="scss">
</style>
