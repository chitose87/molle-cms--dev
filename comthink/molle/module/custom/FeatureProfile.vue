<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"

  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import Headline from "~/molle-cms/src/module/primitive/Headline.vue";
import Paragraph from "~/molle-cms/src/module/primitive/Paragraph.vue";
import Button from "~/molle-cms/src/module/primitive/Button.vue";
import Picture from "~/molle-cms/src/module/primitive/Picture.vue";
import Feature from "./Feature.vue";

@Component({
  components: {StyleComp},
})
export default class FeatureProfile extends Profile {
  static readonly CLASS_NAME = "FeatureProfile";
  static readonly LANGS = {
    en:  Feature.CLASS_NAME,
    jp: "説明",
  };
  //style setting
  static readonly stylePermission = {
    margin: "",
    padding: "",
  };
  static settings = {
    type: "group",
    opt: {
      value: {
        headline: {fixedModuleId: "Headline", order: 0},
        text: {fixedModuleId: "Paragraph", order: 10},
        btn: {fixedModuleId: "Button", order: 20},
        img: {fixedModuleId: "Picture", order: 30},
      },
    },
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
