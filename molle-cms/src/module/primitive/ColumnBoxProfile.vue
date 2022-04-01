<template lang="pug">
div
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
  details.molle-guide
    summary
    .molle-guide__body.caption
      p 横幅を12分割した時の割合で当該要素のカラム幅(column)を指定します。
  p.caption *-1=auto
  p.caption *0={{$words.notSet}}

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import ColumnBox from "./ColumnBox.vue";

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
    column: {label: Vue.prototype.$words.col, value: Vue.prototype.$words.number},
    columnSp: {
      label: Vue.prototype.$words.col + "-" + Vue.prototype.$words.sp,
      value: Vue.prototype.$words.number,
    },
  };
  //style setting
  static readonly stylePermission = {
    css: true,
  };
  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    black: ["ColumnBox"],
    convert: ["Box"],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
