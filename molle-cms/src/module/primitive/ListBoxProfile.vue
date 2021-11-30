<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

  details.molle-guide
    summary
    .molle-guide__body.caption
      p マーカーの種類をテーマで選択できます。

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import ListBox from "./ListBox.vue";

@Component({
  components: {StyleComp},
})
export default class ListBoxProfile extends Profile {
  static readonly CLASS_NAME = "ListBoxProfile";
  static readonly LANGS = {
    en: ListBox.CLASS_NAME,
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
