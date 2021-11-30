<template lang="pug">
div
  TextAreaQuill(
    :label="custom.text.label+':'"
    v-model="itemData.option.text"
    @change="()=>$emit('change')"
  )

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import {StyleAlign} from "../../Singleton";
import TextAreaQuill from "../../ui/property/TextAreaQuill.vue";
import DataSet from "./DataSet.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class DataSetProfile extends Profile {
  static readonly CLASS_NAME = "DataSetProfile";
  static readonly LANGS = {
    en: DataSet.CLASS_NAME,
    jp: "データセット",
  };
  // custom
  static readonly custom = {
    text: {label: Vue.prototype.$words.text, value: Vue.prototype.$words.text},
  };
  //style setting
  static readonly stylePermission = {
    // align: StyleAlign.None,
    // theme: {default: "", select: ["", "-round"]},
    // color: {default: "", select: ["", "-white"]},
  };
  static settings = {
    type: "children",
    opt: {
      option: {
        text: "見出し"
      },
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
