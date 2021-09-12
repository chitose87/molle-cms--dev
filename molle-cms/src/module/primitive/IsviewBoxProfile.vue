<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "./ColumnBox.vue";
import Box from "./Box.vue";
import BackgroundBox from "./BackgroundBox.vue";
import LinkBox from "./LinkBox.vue";

@Component({
  components: {StyleComp},
})
export default class IsviewBoxProfile extends Profile {
  static readonly CLASS_NAME = "IsviewBoxProfile";
  //style setting
  stylePermission = {
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
