<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )
  label.form-inline
    span.mr-1 {{custom.scale.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.scale"
      @change="()=>$emit('change')"
    )
      option(v-for='item in custom.scale.select' :value="item" v-html="item")

  label {{custom.alt.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 画像が表示できない時に、画像の代わりに表示されるテキストを指定します。
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.alt"
      @change="()=>$emit('change')"
    )

  //
  InputUrlByGS(
    :label="custom.src.label+':'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )
  ImageChecker(
    :target="itemData.value"
    v-model="itemData.option.size"
    @change="()=>$emit('change')"
  )

  //sp用
  InputUrlByGS(
    :label="custom.srcSp.label+':'"
    v-model="itemData.option.sp"
    @change="()=>$emit('change')"
  )
  ImageChecker(
    :target="itemData.option.sp"
    v-model="itemData.option.spSize"
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
import ImageChecker from "~/molle-cms/src/ui/property/ImageChecker.vue";
import Picture from "./Picture.vue";

@Component({
  components: {ImageChecker, InputUrlByGS, GoogleStorage, StyleComp},
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
    scale: {
      label: "倍率",
      default: "",
      select: ["", 2, 3],
    },
  };

  //style setting
  static readonly stylePermission = {
    border: false,
    align: StyleAlign.None,
    // margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-sm", "-lg", "-non-scale"]},
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
