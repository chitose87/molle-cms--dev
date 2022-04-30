<template lang="pug">
div
  details.molle-guide
    summary
    .molle-guide__body.caption
      p Listの中にListを置くと階層を下げることができます。

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";

@Component({
  components: {StyleComp},
})
export default class ListProfile extends Profile {
  static readonly CLASS_NAME = "ListProfile";
  static readonly LANGS = {
    en: "List",
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
