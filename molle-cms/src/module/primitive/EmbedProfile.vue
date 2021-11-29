<template lang="pug">
div
  label.w-100
    span {{custom.html.label}}:

    details.molle-guide
      summary
      .molle-guide__body.caption
        p htmlコードを直書きします。（例えばYouTube動画の埋め込みなどに利用できます。）

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
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import {StyleAlign} from "../../Singleton";
import TextAreaQuill from "../../ui/property/TextAreaQuill.vue";
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
    html: {label: "HTML", value: "HTML"},
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
