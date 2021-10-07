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
    MolleGuide(:propertyItem="'tag'")


  StyleComp(
    :itemData="itemData"

    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import TextAreaQuill from "~/molle-cms/src/ui/property/TextAreaQuill.vue";
import Headline from "./Headline.vue";
import Paragraph from "./Paragraph.vue";
import MolleGuide from "~/molle-cms/src/ui/property/MolleGuide.vue";

@Component({
  components: {TextAreaQuill, StyleComp, MolleGuide},
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
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "text",
    convert: [Headline],
    icon: "text-paragraph",
  };
}
</script>

<style lang="scss">
</style>
