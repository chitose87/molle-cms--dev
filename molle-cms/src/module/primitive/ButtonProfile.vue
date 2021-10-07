<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )
  label.form-inline
    span.mr-1 {{custom.url.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p リンク先URLを入力します。
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
    details.molle-guide
      summary
      .molle-guide__body.caption
        p リンクの表示先ウィンドウの指定方法です。
          | 例えば、_blankを選択した場合、新しいウィンドウまたはタブを開いてリンク先を表示します。
          | （新しいウィンドウになるか、新しいタブになるかは、使用しているブラウザに依存して変わります。）

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
    url: {label: Vue.prototype.$words.url, value: Vue.prototype.$words.url},
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
