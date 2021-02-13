<template lang="pug">
div
  //label.form-inline
    span.mr-1 基本カラムサイズ:
    input.form-control.form-control-sm(
      v-model="itemData.option.flexBasis"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 基本カラム幅:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.option.col"
        @change="()=>{$set(itemData.option,'col',Math.max(Math.min(Math.floor(itemData.option.col),12),0));$emit('change')}"
        type="number"
        min="0" max="12" step="1"
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
      )
      span /12
  //p.caption *-1=auto
  p.caption *0=未設定

  //SpaceOptionComp(
  //  :label="'横の隙間'",
  //  :data="itemData.option || {}"
  //  :dataKey="'gutter-h'"
  //  :negative="false"
  //  @change="(v)=>onUpdate('option',v)"
  //)
  //SpaceOptionComp(
  //  :label="'縦の隙間'",
  //  :data="itemData.option || {}"
  //  :dataKey="'gutter-v'"
  //  :negative="false"
  //  @change="(v)=>onUpdate('option',v)"
  //)
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )
  ChildrenOptionComp(
    :moduleId="itemData.moduleId"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )


</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import {Profile} from "~/molle/module/Profile";
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import ChildrenOptionComp from "~/molle/ui/property/ChildrenOptionComp.vue";

@Component({
  components: {ChildrenOptionComp, StyleComp}
})
export default class ColumnProfile extends Profile {
  //style setting
  stylePermission = {
    container: false,
    border: false,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
}
</script>

<style lang="scss">
</style>
