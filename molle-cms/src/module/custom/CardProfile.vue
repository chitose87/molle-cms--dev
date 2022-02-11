<template lang="pug">
div
  details.molle-guide
    summary
    .molle-guide__body.caption
      p Picture、Headline、Paragraph、Buttonをグループ化したモジュールです。

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
    theme: {default: "", select: ["", "-outside"]},
    color: {default: "", select: ["", "-light", ""]},
  };
  static settings = {
    type: "group",
    opt: {
      value: {
        img: {id: "{uid}", fixedModuleId: "Picture", order: 0},
        headline: {id: "{uid}", fixedModuleId: "Headline", order: 10},
        text: {
          id: "{uid}",
          fixedModuleId: "Box",
          order: 20,
          opt: {
            enabled: ["Paragraph"],
          },
        },
        btnList: {id: "{uid}", fixedModuleId: "ButtonList", order: 30},
      },
    },
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
