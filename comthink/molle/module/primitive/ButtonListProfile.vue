<template lang="pug">
div
  label
    span.mr-1 基本カラム幅:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.option.col"
        @change="()=>{$set(itemData.option,'col',Math.max(Math.min(Math.floor(itemData.option.col),12),0));$emit('change')}"
        type="number"
        min="0" max="12" step="1",
        aria-autocomplete="false"
      )
      span /12
  label
    span.mr-1 基本カラム幅-SP:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.option.colSm"
        @change="()=>{$set(itemData.option,'colSm',Math.max(Math.min(Math.floor(itemData.option.colSm),12),0));$emit('change')}"
        type="number"
        min="0" max="12" step="1"
        aria-autocomplete="false"
      )
      span /12
  //p.caption *-1=auto
  p.caption *0=未設定

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Profile} from "~/molle/module/Profile";
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import {StyleAlign} from "~/molle/Singleton";

@Component({
  components: {StyleComp}
})
export default class ButtonListProfile extends Profile {
  //style setting
  stylePermission = {
    // container: false,
    // border: false,
    align: StyleAlign.None,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
}
</script>

<style lang="scss">
</style>
