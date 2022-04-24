<template lang="pug">
  div
    label {{custom.alt.label}}:
      details.molle-guide
        summary
        .molle-guide__body.caption
          p 代替文字。画像の説明
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

    label.form-inline color:
      input.form-control.form-control-sm.w-25(
        type="color"
        v-model="itemData.style['background-color']"
        @change="()=>$emit('change')"
      )
      button.form-control.form-control-sm(
        v-if="itemData.style['background-color']"
        @click="bgClear()"
      )
        span clear

    GoogleStorage

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
import GoogleStorage from "~/molle-cms/src/ui/GoogleStorage.vue";
import InputUrlByGS from "~/molle-cms/src/ui/property/InputUrlByGS.vue";
import ImageChecker from "~/molle-cms/src/ui/property/ImageChecker.vue";

@Component({
  components: {ImageChecker, InputUrlByGS, GoogleStorage, StyleComp},
})
export default class ScrollTransAnchorProfile extends Profile {
  static readonly CLASS_NAME = "ScrollTransAnchorProfile";
  static readonly LANGS = {
    en: "",
    jp: "",
  };
  // custom
  static readonly custom = {
    src: {label: Vue.prototype.$words.src, value: Vue.prototype.$words.url},
    srcSp: {label: Vue.prototype.$words.src + "-" + Vue.prototype.$words.sp, value: Vue.prototype.$words.url},
    alt: {label: Vue.prototype.$words.alt, value: Vue.prototype.$words.text},
  };
  //style setting
  static readonly stylePermission = {
    theme: {default: "", select: ["", "mesh-none"]},
    // color: {default: "", select: ["", "-invert"]},
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
