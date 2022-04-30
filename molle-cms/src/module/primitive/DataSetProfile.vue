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
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import TextAreaQuill from "~/molle-cms/src/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class DataSetProfile extends Profile {
  static readonly CLASS_NAME = "DataSetProfile";
  static readonly LANGS = {
    en: "DataSet",
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
