<template lang="pug">
div
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

  details.molle-guide
    summary
    .molle-guide__body.caption
      p 横幅を12分割した時の割合で子要素のカラム幅(column)を指定します。

  p.caption *0={{$words.notSet}}

  // justify
  label.form-inline
    span.mr-1 {{custom.justify.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.justify"
      @change="()=>$emit('change')"
    )
      option(v-for="item in custom.justify.select" :value="item" v-html="item")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {StyleAlign} from "../../Singleton";
import Column from "./Column.vue";
import {Profile} from "../Profile";

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
    justify: {
      label: Vue.prototype.$words.justify,
      default: "",
      select: ["", "start", "center", "end", "between", "around"],
    },
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    // align: StyleAlign.None,// todo tbd
    // margin: "",
    // padding: "",
    space: {default: "", select: [...StyleComp.spaceSelect]},
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "ColumnBox"},
      ],
      option: {
        col: 4,
        colSm: 12,
      },
    },
    white: ["ColumnBox", "Box"],
    icon: "layout-three-columns",
  };
}
</script>

<style lang="scss">
</style>
