<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "./ColumnBox.vue";
import ListItemBox from "./ListItemBox.vue";

@Component({
  components: {StyleComp},
})
export default class ListItemBoxProfile extends Profile {
  static readonly CLASS_NAME = "ListItemBoxProfile";
  static readonly LANGS = {
    en: ListItemBox.CLASS_NAME,
    jp: "リストアイテムボックス",
  };
  // custom
  static readonly custom = {
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // "container-fluid": false,
    // section: false,
    // border: false,
    margin: "",
    padding: "",
    theme: {default: "-disc", select: ["-none", "-number", "-disc"]},
  };

  static settings = {
    type: "children",
    black: [ColumnBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
