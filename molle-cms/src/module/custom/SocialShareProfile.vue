<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )
  label.form-inline
    span.mr-1 {{custom.facebook.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.noFacebook",
      type="checkbox",
      @change="() => $emit('change')"
    )
  label.form-inline
    span.mr-1 {{custom.twitter.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.noTwitter",
      type="checkbox",
      @change="() => $emit('change')"
    )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Profile} from "~/molle-cms/src/module/Profile";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import SocialShare from "./SocialShare.vue";

@Component({
  components: {StyleComp},
})
export default class SocialShareProfile extends Profile {
  static readonly CLASS_NAME = "SocialShareProfile";
  static readonly LANGS = {
    en: SocialShare.CLASS_NAME,
    jp: "SNSシェア",
  };
  // custom
  static readonly custom = {
    facebook: {
      label: Vue.prototype.$words.donot + " Facebook",
      default: Vue.prototype.$words.false,
      select: [Vue.prototype.$words.true, Vue.prototype.$words.false],
    },
    twitter: {
      label: Vue.prototype.$words.donot + " Twitter",
      default: Vue.prototype.$words.false,
      select: [Vue.prototype.$words.true, Vue.prototype.$words.false],
    },
  };
  //style setting
  static readonly stylePermission = {
    // border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "decorate"]},
    // color: {default: "", select: ["", "text-white"]},
  };
  static settings = {
    type: "any",
    icon: "share",
  };
}
</script>

<style lang="scss">
</style>
