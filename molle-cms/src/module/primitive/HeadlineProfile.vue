<template lang="pug">
div
  TextAreaQuill(
    :label="custom.text.label+':'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )

  TextAreaQuill(
    :label="custom.subText.label+':'"
    v-model="itemData.option.text"
    @change="()=>$emit('change')"
  )

  label.form-inline
    span.mr-1 {{custom.lv.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.lv"
      @change="()=>$emit('change')"
    )
      option(v-for='item in custom.lv.select' :value="item" v-html="item")
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 見出しのレベルです。h1(大)～h6(小)の6段階あります。

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Profile} from "../Profile";
import StyleComp from "../../ui/property/StyleComp.vue";
import {StyleAlign} from "../../Singleton";
import TextAreaQuill from "../../ui/property/TextAreaQuill.vue";
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

  // custom
  static readonly custom = {
    text: {label: Vue.prototype.$words.title, value: Vue.prototype.$words.text},
    subText: {label: Vue.prototype.$words.sub, value: Vue.prototype.$words.text},
    lv: {
      label: Vue.prototype.$words.level,
      default: "h3",
      select: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  };

  //style setting
  static readonly stylePermission = {
    align: StyleAlign.None,
    theme: {default: "", select: ["", "decorate", "decorate-white"]},
    color: {default: "", select: ["", "text-white"]},
  };

  static settings = {
    type: "text",
    opt: {
      option: {
        lv: HeadlineProfile.custom.lv.default,
      },
    },
    convert: ["Paragraph"],
    icon: "card-heading",
  };
}
</script>

<style lang="scss">
</style>
