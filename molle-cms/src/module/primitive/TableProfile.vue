<template lang="pug">
div
  StyleComp(
    :itemData="itemData",
    @change="() => $emit('change')"
  )

  label.form-inline
    span.mr-1 {{custom.csv.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 表の内容をCSV形式で入力します。
        p 表のセル内で改行する時は、改行箇所に"&lt;br&gt;"と書いてください。
          | （例：aaaaa&lt;br&gt;bbbbb）
    textarea.form-control.form-control-sm(
      v-model="itemData.value",
      placehholder="csv only",
      @change="() => $emit('change')"
    )

  label.form-inline
    span.mr-1 {{custom.row.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.lineHeading",
      type="checkbox",
      @change="() => $emit('change')"
    )

  label.form-inline
    span.mr-1 {{custom.column.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.columnHeading",
      type="checkbox",
      @change="() => $emit('change')"
    )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import {StyleAlign} from "../../Singleton";
import Table from "./Table.vue";

@Component({
  components: {StyleComp},
})
export default class TableProfile extends Profile {
  static readonly CLASS_NAME = "TableProfile";
  static readonly LANGS = {
    en: Table.CLASS_NAME,
    jp: "表",
  };
  // custom
  static readonly custom = {
    csv: {label: Vue.prototype.$words.csv, value: Vue.prototype.$words.csv},
    row: {
      label: Vue.prototype.$words.row + Vue.prototype.$words.headline,
      default: Vue.prototype.$words.false,
      select: [Vue.prototype.$words.true, Vue.prototype.$words.false],
    },
    column: {
      label: Vue.prototype.$words.column + Vue.prototype.$words.headline,
      default: Vue.prototype.$words.true,
      select: [Vue.prototype.$words.true, Vue.prototype.$words.false],
    },
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
  };
}
</script>

<style lang="scss">
</style>
