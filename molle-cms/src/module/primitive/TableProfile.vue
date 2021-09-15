<template lang="pug">
div
  StyleComp(
    :itemData="itemData",
    ,
    @change="() => $emit('change')"
  )
  label.form-inline
    span.mr-1 {{$words.csv}}:
    textarea.form-control.form-control-sm(
      v-model="itemData.value",
      placehholder="csv only",
      @change="() => $emit('change')"
    )

  label.form-inline
    span.mr-1 {{$words.row}}{{$words.headline}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.lineHeading",
      type="checkbox",
      @change="() => $emit('change')"
    )
  label.form-inline
    span.mr-1 {{$words.column}}{{$words.headline}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.columnHeading",
      type="checkbox",
      @change="() => $emit('change')"
    )
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import Table from "./Table.vue";

@Component({
  components: {StyleComp},
})
export default class TableProfile extends Profile {
  static readonly CLASS_NAME = "TableProfile";
  static readonly LANGS = {
    en:  Table.CLASS_NAME,
    jp: "表",
  };
  //style setting
  static readonly stylePermission = {
    border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "text",
    opt: {
      value: "th,aaa\nth,bbb",
      option: {columnHeading: true},
    },
    icon: "table",
  }
}
</script>

<style lang="scss">
</style>
