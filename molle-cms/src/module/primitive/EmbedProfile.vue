<template lang="pug">
div
  label.w-100
    span {{custom.html.label}}:
    textarea.form-control.form-control-sm(
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )

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
import Embed from "./Embed.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class EmbedProfile extends Profile {
  static readonly CLASS_NAME = "EmbedProfile";
  static readonly LANGS = {
    en: Embed.CLASS_NAME,
    jp: "埋め込み",
  };
  // custom
  static readonly custom = {
    html: {label: "HTML", value: "HTMLを直接入力"},
  };
  //style setting
  static readonly stylePermission = {
    // border: false,
    // align: StyleAlign.None,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "-caption"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "text",
    icon: "text-paragraph",
  };
}
</script>

<style lang="scss">
</style>
