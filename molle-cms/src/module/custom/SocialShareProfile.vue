<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )
  label.form-inline
    span.mr-1 {{custom.facebook.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.facebook",
      type="checkbox",
      @change="() => $emit('change')"
    )
  label.form-inline
    span.mr-1 {{custom.twitter.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.twitter",
      type="checkbox",
      @change="() => $emit('change')"
    )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Profile} from "../Profile";
import StyleComp from "../../ui/property/StyleComp.vue";
import {StyleAlign} from "../../Singleton";
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
      label: "Facebook",
      default: Vue.prototype.$words.true,
      select: [Vue.prototype.$words.true, Vue.prototype.$words.false],
    },
    twitter: {
      label: "Twitter",
      default: Vue.prototype.$words.true,
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
    opt: {
      option: {
        facebook: true,
        twitter: true,
      },
    },
    icon: "share",
  };
}
</script>

<style lang="scss">
</style>
