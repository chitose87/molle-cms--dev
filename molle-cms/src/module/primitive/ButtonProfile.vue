<template lang="pug">
div
  // block
  label.form-inline
    span.mr-1 {{custom.block.label}}:
    input.form-control.form-control-sm(
      v-model="itemData.class.block",
      type="checkbox",
      @change="() => $emit('change')"
    )

  //url
  label.w-100
    span.mr-1 {{custom.url.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p リンク先URLを入力します。
    a(:href="itemData.option.href" :target="itemData.option.target")
      b-icon(icon="link")
    input.form-control.form-control-sm(
      type="url"
      v-model="itemData.option.href"
      @change="()=>$emit('change')"
    )

  //label
  label.w-100
    span.mr-1 {{custom.label.label}}:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )

  //target
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

  details
    summary {{custom.upload.label}}:
      details.molle-guide
        summary
        .molle-guide__body.caption
          p ファイルをアップロードし、URLにアップロード先URLを入力するとそのファイルへのリンクボタンになります。
    div
      GoogleStorage

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )


</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import GoogleStorage from "~/molle-cms/src/ui/GoogleStorage.vue";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";

@Component({
  components: {StyleComp, GoogleStorage},
})
export default class ButtonProfile extends Profile {
  static readonly CLASS_NAME = "ButtonProfile";
  static readonly LANGS = {
    en: "Button",
    jp: "ボタン",
  };
  // custom
  static readonly custom = {
    url: {label: Vue.prototype.$words.url, value: Vue.prototype.$words.url},
    label: {label: Vue.prototype.$words.label, value: Vue.prototype.$words.text},
    block: {label: Vue.prototype.$words.block},
    target: {
      label: Vue.prototype.$words.target,
      default: "",
      select: ["", "_self", "_blank"],
    },
    upload: {label: Vue.prototype.$words.file + Vue.prototype.$words.upload},
  };
  //style setting
  static readonly stylePermission = {
    // border: false,
    // align: StyleAlign.None,
    // margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-sm", "-lg"]},
    color: {default: "-primary", select: ["", "-primary", "-secondary"]},
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
