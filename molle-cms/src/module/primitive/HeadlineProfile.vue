<template lang="pug">
div
  TextAreaQuill(
    :label="getCustom().text.label+':'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )

  TextAreaQuill(
    :label="getCustom().subText.label+':'"
    v-model="itemData.option.text"
    @change="()=>$emit('change')"
  )

  label.form-inline
    span.mr-1 {{getCustom().lv.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.lv"
      @change="()=>$emit('change')"
    )
      option(v-for='item in getCustom().lv.select' :value="item" v-html="item")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Profile} from "~/molle-cms/src/module/Profile";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import TextAreaQuill from "~/molle-cms/src/ui/property/TextAreaQuill.vue";
import Paragraph from "./Paragraph.vue";
import Headline from "./Headline.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class HeadlineProfile extends Profile {
  static readonly CLASS_NAME = "HeadlineProfile";
  static readonly LANGS = {
    en: Headline.CLASS_NAME,
    jp: "見出し",
  };

  //style setting
  static readonly stylePermission = {
    border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    theme: {default: "", select: ["", "decorate"]},
    color: {default: "", select: ["", "text-white"]},

    //
    custom: {
      text: {label: "タイトル", value: "テキスト"},
      subText: {label: "サブタイトル", value: "テキスト"},
      lv: {label: "見出しレベル", default: "h3", select: ["h1", "h2", "h3", "h4", "h5", "h6"]},
    },
  };

  static settings = {
    type: "text",
    opt: {
      option: {
        lv: HeadlineProfile.stylePermission.custom.lv.default,
      },
    },
    convert: [Paragraph],
    icon: "card-heading",
  };
}
</script>

<style lang="scss">
</style>
