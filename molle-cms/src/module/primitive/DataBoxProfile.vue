<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import DataBox from "./DataBox.vue";

@Component({
  components: {StyleComp},
})
export default class DataBoxProfile extends Profile {
  static readonly CLASS_NAME = "DataBoxProfile";
  static readonly LANGS = {
    en: DataBox.CLASS_NAME,
    jp: "データセット",
  };
  // custom
  static readonly custom = {};
  //style setting
  static readonly stylePermission = {
    // align: StyleAlign.None,
    theme: {default: "", select: ["", "-auto", "-md"]},
    color: {default: "", select: ["", "-border", "-round", "faq"]},
    space: {default: "", select: [...StyleComp.spaceSelect]},
  };
  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "DataSet"},
      ],
    },
    convert: ["DataSet"],
    white: ["DataSet"],
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
