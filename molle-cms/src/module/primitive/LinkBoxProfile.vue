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
import ColumnBox from "./ColumnBox.vue";
import Box from "./Box.vue";
import BackgroundBox from "./BackgroundBox.vue";
import IsviewBox from "./IsviewBox.vue";
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
    url: {label: Vue.prototype.$words.url, value: Vue.prototype.$words.link},
    target: {
      label: Vue.prototype.$words.target,
      default: "",
      select: ["", "_self", "_blank"],
    },
  };
  //style setting
  static readonly stylePermission = {};

  static settings = {
    type: "children",
    black: [ColumnBox],
    convert: [Box, BackgroundBox, IsviewBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
