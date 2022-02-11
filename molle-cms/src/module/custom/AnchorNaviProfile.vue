<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import AnchorNavi from "./AnchorNavi.vue";
import {StyleAlign} from "~/molle-cms/src/Singleton";

@Component({
  components: {StyleComp}
})
export default class AnchorNaviProfile extends Profile {
  static readonly CLASS_NAME = "AnchorNaviProfile";
  static readonly LANGS = {
    en: AnchorNavi.CLASS_NAME,
    jp: "アンカーナビ",
  };

  // custom
  static readonly custom = {};

  //style setting
  static readonly stylePermission = {
    // align: StyleAlign.None,
  };

  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Button"},
      ],
    },
    convert: ["ButtonList"],
    white: ["Button"],
    icon: "layout-three-columns",
  };
}
</script>

<style lang="scss">
</style>
