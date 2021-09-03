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
import ColumnBox from "~/molle/module/primitive/ColumnBox.vue";
import Box from "~/molle/module/primitive/Box.vue";
import BackgroundBox from "~/molle/module/primitive/BackgroundBox.vue";
import LinkBox from "~/molle/module/primitive/LinkBox.vue";

@Component({
  components: {StyleComp},
})
export default class IsviewBoxProfile extends Profile {
  //style setting
  stylePermission = {
    theme: {default: "", select: ["", "-slide", "-fade"]},
  };

  static settings = {
    type: "children",
    black: [ColumnBox],
    convert: [Box, ColumnBox, BackgroundBox, LinkBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
