<template lang="pug">
div
  //label.form-inline
    span.mr-1 基本カラムサイズ:
    input.form-control.form-control-sm(
      v-model="itemData.option.flexBasis"
      @change="()=>$emit('change')"
    )
  label
    span.mr-1 {{custom.column.label}}:
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
    span.mr-1 {{custom.columnSp.label}}:
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
  p.caption *0={{$words.notSet}}

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

  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Profile} from "~/molle-cms/src/module/Profile";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import ColumnBox from "./ColumnBox.vue";
import Box from "./Box.vue";
import Column from "./Column.vue";

@Component({
  components: {StyleComp},
})
export default class ColumnProfile extends Profile {
  static readonly CLASS_NAME = "ColumnProfile";
  static readonly LANGS = {
    en: Column.CLASS_NAME,
    jp: "カラム",
  };
  // custom
  static readonly custom = {
    column: {
      label: Vue.prototype.$words.basic + Vue.prototype.$words.col,
      value: Vue.prototype.$words.number,
    },
    columnSp: {
      label: Vue.prototype.$words.basic + Vue.prototype.$words.col + "-" + Vue.prototype.$words.sp,
      value: Vue.prototype.$words.number,
    },
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    align: StyleAlign.None,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "children",
    white: [ColumnBox, Box],
    icon: "layout-three-columns",
  };
}
</script>

<style lang="scss">
</style>
