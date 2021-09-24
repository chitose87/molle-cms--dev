<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )
  label.form-inline
    span.mr-1 {{custom.url.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.option.href"
      @change="()=>$emit('change')"
    )
  label.form-inline
    span.mr-1 {{custom.label.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )
  label.form-inline
    span.mr-1 {{custom.target.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.target"
      @change="()=>$emit('change')"
    )
      option(v-for="item in custom.target.select" :value="item" v-html="item")

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import Button from "./Button.vue";

@Component({
  components: {StyleComp},
})
export default class ButtonProfile extends Profile {
  static readonly CLASS_NAME = "ButtonProfile";
  static readonly LANGS = {
    en: Button.CLASS_NAME,
    jp: "ボタン",
  };
  // custom
  static readonly custom = {
    url: {label: Vue.prototype.$words.url, value: Vue.prototype.$words.link},
    label: {label: Vue.prototype.$words.label, value: Vue.prototype.$words.text},
    target: {
      label: Vue.prototype.$words.target,
      default: "",
      select: ["", "_self", "_blank"],
    },
  };
  //style setting
  static readonly stylePermission = {
    // border: false,
    // align: StyleAlign.None,
    // margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-sm", "-lg"]},
    color: {default: "", select: ["", "-primary", "-secondary", "-link"]},
  };
  static settings = {
    type: "button",
    opt: {
      option: {
        href: "https://placehold.jp/",
        target: "",
      },
    },
    icon: "hand-index",
  };
}
</script>

<style lang="scss">
</style>
