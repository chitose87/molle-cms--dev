<template lang="pug">
div
  details.molle-guide
    summary
    .molle-guide__body.caption
      p PictureモジュールとParagraphモジュール２つをグループ化したモジュールです。

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import Picture from "~/molle-cms/src/module/primitive/Picture.vue";
import Paragraph from "~/molle-cms/src/module/primitive/Paragraph.vue";
import Card from "./Card.vue";

@Component({
  components: {StyleComp},
})
export default class CardProfile extends Profile {
  static readonly CLASS_NAME = "CardProfile";
  static readonly LANGS = {
    en: Card.CLASS_NAME,
    jp: "カード",
  };

  // custom
  static readonly custom = {};

  //style setting
  static readonly stylePermission = {
    // border: false,
    // align: StyleAlign.None,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "-sm", "-lg"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "group",
    opt: {
      value: {
        img: {fixedModuleId: "Picture", order: 0},
        headline: {fixedModuleId: "Paragraph", order: 10},
        text: {fixedModuleId: "Paragraph", order: 20},
      },
    },
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
