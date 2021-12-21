<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
    )

    div(v-if="itemData.class.theme=='bg -zone'")
      InputUrlByGS(
        :label="custom.bg.label+':'"
        v-model="itemData.option.bg"
        @change="()=>$emit('change')"
      )
      ImageChecker(
        :target="itemData.option.bg"
        v-model="itemData.option.size"
        @change="()=>$emit('change')"
      )

      //
      InputUrlByGS(
        :label="custom.bgSp.label+':'"
        v-model="itemData.option.sp"
        @change="()=>$emit('change')"
      )
      ImageChecker(
        :target="itemData.option.sp"
        v-model="itemData.option.spSize"
        @change="()=>$emit('change')"
      )

      GoogleStorage

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import Section from "./Section.vue";
import GoogleStorage from "~/molle-cms/src/ui/GoogleStorage.vue";
import InputUrlByGS from "~/molle-cms/src/ui/property/InputUrlByGS.vue";
import ImageChecker from "~/molle-cms/src/ui/property/ImageChecker.vue";

@Component({
  components: {ImageChecker, StyleComp, GoogleStorage, InputUrlByGS},
})
export default class SectionProfile extends Profile {
  static readonly CLASS_NAME = "SectionProfile";
  static readonly LANGS = {
    en: Section.CLASS_NAME,
    jp: "セクション",
  };
  // custom
  static readonly custom = {
    bg: {label: Vue.prototype.$words.bg, value: Vue.prototype.$words.url},
    bgSp: {
      label: Vue.prototype.$words.bg + "-" + Vue.prototype.$words.sp,
      value: Vue.prototype.$words.url,
    },
  };
  //style setting
  static readonly stylePermission = {
    space: {default: "", select: [...StyleComp.spaceSelect]},
    theme: {default: "", select: ["", "bg -zone"]},
    color: {default: "", select: ["", "secondary -zone"]},
  };

  //
  static settings = {
    type: "children",
    opt: {
      value: [],
    },
    tags: ["box","any"],
    black: ["ColumnBox", "List", "DataSet"],
    convert: ["Box", "ColumnBox", "BackgroundBox", "ListBox", "DataBox"],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
