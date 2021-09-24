<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"

  )

  InputUrlByGS(
    :label="custom.src.label+':'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )
  InputUrlByGS(
    :label="custom.srcSp.label+':'"
    v-model="itemData.option.sp"
    @change="()=>$emit('change')"
  )
  label {{custom.alt.label}}:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.alt"
      @change="()=>$emit('change')"
    )

  GoogleStorage

  //a.btn.btn-secondary.btn-sm(href="https://console.firebase.google.com/project/" + process.env.projectId + "/storage/" + process.env.storageBucket + "/files~2Fimages?hl=ja" target="_blank")
    span Storage

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import GoogleStorage from "~/molle-cms/src/ui/GoogleStorage.vue";
import InputUrlByGS from "~/molle-cms/src/ui/property/InputUrlByGS.vue";
import Picture from "./Picture.vue";

@Component({
  components: {InputUrlByGS, GoogleStorage, StyleComp},
})
export default class PictureProfile extends Profile {
  static readonly CLASS_NAME = "PictureProfile";
  static readonly LANGS = {
    en: Picture.CLASS_NAME,
    jp: "画像",
  };
  // custom
  static readonly custom = {
    src: {label: Vue.prototype.$words.src, value: Vue.prototype.$words.url},
    srcSp: {label: Vue.prototype.$words.src + "-" + Vue.prototype.$words.sp, value: Vue.prototype.$words.url},
    alt: {label: Vue.prototype.$words.alt, value: Vue.prototype.$words.text},
    explorer: {label: Vue.prototype.$words.explorer, value: "Google Storageへのリンク"},
    upload: {label: Vue.prototype.$words.upload, value: "Google Storageにファイルをアップロード"},
    complete: {label: Vue.prototype.$words.complete, value: "ファイルの" + Vue.prototype.$words.upload + "先URL"},
  };
  //style setting
  static readonly stylePermission = {
    border: false,
    align: StyleAlign.None,
    // margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-sm", "-lg"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "picture",
    opt: {
      option: {
        sp: "",
        alt: "",
      },
    },
    icon: "image",
  };
}
</script>

<style lang="scss">
</style>
