<template lang="pug">
div
  details.molle-guide
    summary
    .molle-guide__body.caption
      p Listの中にListを置くと階層を下げることができます。

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import List from "./List.vue";

@Component({
  components: {StyleComp},
})
export default class ListProfile extends Profile {
  static readonly CLASS_NAME = "ListProfile";
  static readonly LANGS = {
    en: List.CLASS_NAME,
    jp: "リスト",
  };
  // custom
  static readonly custom = {};
  //style setting
  static readonly stylePermission = {};

  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    black: ["ColumnBox", "DataSet"],
    convert: ["Box", "ListBox"],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
.list-checker {
  &.form-control {
    height: auto;
  }
}

</style>
