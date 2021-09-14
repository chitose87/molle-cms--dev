<template lang="pug">
div
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
import RandomCardBox from "~/molle/module/custom/RandomCardBox.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class RandomCardsProfile extends Profile {
  static readonly CLASS_NAME = "RandomCardsProfile";

  static readonly LANGS = {
    en:  .CLASS_NAME,
    jp: "",
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    // align: StyleAlign.None,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings={
    type: "children",
    opt:{
      option: {
        minLv: 1,
        maxLv: 4,
      },
    },
    white: [RandomCardBox],
    icon: "layout-three-columns",
  }
}
</script>

<style lang="scss">
</style>
