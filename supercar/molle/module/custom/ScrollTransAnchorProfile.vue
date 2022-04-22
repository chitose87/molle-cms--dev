<template lang="pug">
  div

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";

@Component({
  components: {StyleComp},
})
export default class ScrollTransAnchorProfile extends Profile {
  static readonly CLASS_NAME = "ScrollTransAnchorProfile";
  static readonly LANGS = {
    en: "",
    jp: "",
  };
  // custom
  static readonly custom = {};
  //style setting
  static readonly stylePermission = {
    // theme: {default: "", select: ["", "-caption"]},
    // color: {default: "", select: ["", "-invert"]},
  };
  static settings = {
    type: "any",
    // icon: "text-paragraph",
  };
}
</script>

<style lang="scss">
</style>
