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
      type="url"
      v-model="itemData.option.href"
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
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import LinkBox from "./LinkBox.vue";

@Component({
  components: {StyleComp},
})
export default class LinkBoxProfile extends Profile {
  static readonly CLASS_NAME = "LinkBoxProfile";
  static readonly LANGS = {
    en: LinkBox.CLASS_NAME,
    jp: "リンクボックス",
  };
  // custom
  static readonly custom = {
    url: {label: Vue.prototype.$words.url, value: Vue.prototype.$words.url},
    target: {
      label: Vue.prototype.$words.target,
      default: "",
      select: ["", "_self", "_blank"],
    },
  };
  //style setting
  static readonly stylePermission = {
  };

  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    black: ["ColumnBox", "Button", "ButtonList"],
    convert: ["Box", "BackgroundBox", "IsviewBox"],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
