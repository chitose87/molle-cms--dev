<template lang="pug">
div
  //SpaceOptionComp(
  //  :label="'横の隙間'",
  //  :data="itemData.option || {}"
  //  :dataKey="'gutter-h'"
  //  :negative="false"
  //  @change="(v)=>onUpdate('option',v)"
  //)
  //SpaceOptionComp(
  //  :label="'縦の隙間'",
  //  :data="itemData.option || {}"
  //  :dataKey="'gutter-v'"
  //  :negative="false"
  //  @change="(v)=>onUpdate('option',v)"
  //)
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"

  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Profile} from "~/molle-cms/src/module/Profile";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import Picture from "~/molle-cms/src/module/primitive/Picture.vue";

@Component({
  components: {StyleComp},
})
export default class GalleryProfile extends Profile {
  static readonly CLASS_NAME = "GalleryProfile";
  //style setting
  static readonly stylePermission = {
    container: false,
    border: false,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "children",
    white: [Picture],
    icon: "three-dots",
  };
}
</script>

<style lang="scss">
</style>
