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
import Headline from "~/molle/module/primitive/Headline.vue";
import Paragraph from "~/molle/module/primitive/Paragraph.vue";
import Button from "~/molle/module/primitive/Button.vue";
import Picture from "~/molle/module/primitive/Picture.vue";

@Component({
  components: {StyleComp},
})
export default class FeatureProfile extends Profile {
  static readonly CLASS_NAME = "FeatureProfile";
  static readonly LANGS = {
    en:  .CLASS_NAME,
    jp: "",
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
