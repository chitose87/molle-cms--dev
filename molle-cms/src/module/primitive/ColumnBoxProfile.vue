<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

  label
    span.mr-1 {{custom.column.label}}:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.option.col"
        @change="()=>{$set(itemData.option,'col',Math.max(Math.min(Math.floor(itemData.option.col),12),-1));$emit('change')}"
        type="number"
        min="-1" max="12" step="1"
      )
      span /12
  label
    span.mr-1 {{custom.columnSp.label}}:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.option.colSm"
        @change="()=>{$set(itemData.option,'colSm',Math.max(Math.min(Math.floor(itemData.option.colSm),12),-1));$emit('change')}"
        type="number"
        min="-1" max="12" step="1"
      )
      span /12
  p.caption *-1=auto
  p.caption *0={{$words.notSet}}

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "./ColumnBox.vue";
import Box from "./Box.vue";

@Component({
  components: {StyleComp},
})
export default class ColumnBoxProfile extends Profile {
  static readonly CLASS_NAME = "ColumnBoxProfile";
  static readonly LANGS = {
    en: ColumnBox.CLASS_NAME,
    jp: "カラムボックス",
  };
  // custom
  static readonly custom = {
    column: {label: Vue.prototype.$words.col, value: "要素の幅を個別指定"},
    columnSp: {
      label: Vue.prototype.$words.col + "-" + Vue.prototype.$words.sp,
      value: Vue.prototype.$words.sp + "表示時の幅指定",
    },
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "children",
    black: [ColumnBox],
    convert: [Box],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
