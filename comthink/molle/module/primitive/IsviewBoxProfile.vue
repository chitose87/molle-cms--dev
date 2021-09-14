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
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "~/molle/module/primitive/ColumnBox.vue";
import Box from "~/molle/module/primitive/Box.vue";
import BackgroundBox from "~/molle/module/primitive/BackgroundBox.vue";
import LinkBox from "~/molle/module/primitive/LinkBox.vue";

@Component({
  components: {StyleComp},
})
export default class IsviewBoxProfile extends Profile {
  static readonly CLASS_NAME = "IsviewBoxProfile";
  static readonly LANGS = {
    en:  .CLASS_NAME,
    jp: "",
  };
  //style setting
  static readonly stylePermission = {
    theme: {default: "", select: ["", "-slide", "-fade"]},
  };

  static settings = {
    type: "children",
    black: [ColumnBox],
    convert: [Box, BackgroundBox, LinkBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
