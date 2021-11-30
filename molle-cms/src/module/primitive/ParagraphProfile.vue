<template lang="pug">
div
  TextAreaQuill(
    :label="custom.text.label+':'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )

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
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import {StyleAlign} from "../../Singleton";
import TextAreaQuill from "../../ui/property/TextAreaQuill.vue";
import Paragraph from "./Paragraph.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class ParagraphProfile extends Profile {
  static readonly CLASS_NAME = "ParagraphProfile";
  static readonly LANGS = {
    en: Paragraph.CLASS_NAME,
    jp: "段落",
  };
  // custom
  static readonly custom = {
    text: {label: Vue.prototype.$words.text, value: Vue.prototype.$words.text},
    tag: {
      label: Vue.prototype.$words.tag,
      default: "",
      select: ["", "span"],
    },
  };
  //style setting
  static readonly stylePermission = {
    border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-caption"]},
    color: {default: "", select: ["", "-white"]},
  };
  static settings = {
    type: "text",
    convert: ["Headline"],
    icon: "text-paragraph",
  };
}
</script>

<style lang="scss">
</style>
