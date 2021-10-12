<template lang="pug">
div
  label.form-inline
    span.mr-1 {{custom.tag.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in custom.tag.select" :value="item" v-html="item")
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 任意のhtmlタグをつける時に指定します。

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "./ColumnBox.vue";
import BackgroundBox from "./BackgroundBox.vue";
import Box from "./Box.vue";

@Component({
  components: {StyleComp},
})
export default class BoxProfile extends Profile {
  static readonly CLASS_NAME = "BoxProfile";
  static readonly LANGS = {
    en: Box.CLASS_NAME,
    jp: "ボックス",
  };
  // custom
  static readonly custom = {
    tag: {
      label: Vue.prototype.$words.tag,
      default: "",
      select: ["", "section"],
    },
  };
  //style setting
  static readonly stylePermission = {
    container: false,
    "container-fluid": false,
    section: false,
    border: false,
    margin: "",
    padding: "",
    theme: {default: "", select: ["", "-quote"]},
    color: {default: "", select: ["", "-dark", "-gray", "-gray-box"]},
  };

  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    black: [ColumnBox],
    convert: [ColumnBox, BackgroundBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
