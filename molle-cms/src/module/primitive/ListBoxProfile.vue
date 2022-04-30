<template lang="pug">
div
  details.molle-guide
    summary
    .molle-guide__body.caption
      p マーカーの種類をテーマで選択できます。
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";

@Component({
  components: {StyleComp},
})
export default class ListBoxProfile extends Profile {
  static readonly CLASS_NAME = "ListBoxProfile";
  static readonly LANGS = {
    en: "ListBox",
    jp: "リストボックス",
  };
  // custom
  static readonly custom = {
    padding: {
      label: "padding",
      default: "",
      select: ["", "0", "sm", "md", "lg"],
    },
  };
  //style setting
  static readonly stylePermission = {
    theme: {default: "-disc", select: ["", "-none", "-number", "-disc", "step"]},
    space: {default: "", select: [...StyleComp.spaceSelect]},
  };
  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "List"},
      ],
    },
    convert: ["List", "Box", "DataBox"],
    black: ["ColumnBox", "DataSet"],
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
