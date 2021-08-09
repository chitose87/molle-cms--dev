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

  label
    span.mr-1 行間:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.style.lineHeight"
        @change="()=>$emit('change')"
        type="number"
        min="100" max="1000" step="10",
        aria-autocomplete="false"
      )
      span %

  label
    span.mr-1 高さ:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.style.paddingTop"
        @change="()=>$emit('change')"
        type="number"
        min="0" max="30" step="1",
        aria-autocomplete="false"
      )
      span %

  label
    span.mr-1 開始:
    .form-inline
      input.form-control.form-control-sm(
        v-model="itemData.style.paddingRight"
        @change="()=>$emit('change')"
        type="number"
        min="0" max="30" step="1",
        aria-autocomplete="false"
      )
      span %

  TextAreaQuill(
    :label="'Text:'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )

  TextAreaQuill(
    :label="'subText:'"
    v-model="itemData.option.text"
    @change="()=>$emit('change')"
  )

  label.form-inline
    span.mr-1 見出しレベル:
    select.form-control.form-control-sm(
      v-model="itemData.option.lv"
      @change="()=>$emit('change')"
    )
      option(v-for='item in ["h1", "h2", "h3", "h4", "h5", "h6"]' :value="item" v-html="item")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Profile} from "molle-cms/src/module/Profile";
import StyleComp from "molle-cms/src/ui/property/StyleComp.vue";
import {StyleAlign} from "molle-cms/src/Singleton";
import TextAreaQuill from "molle-cms/src/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp}
})
export default class VerticalHeadlineProfile extends Profile {
  //style setting
  stylePermission = {
    border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    theme: {default: "", select: ["", "decorate"]},
    color: {default: "", select: ["", "text-white"]},
  };
}
</script>

<style lang="scss">
</style>
