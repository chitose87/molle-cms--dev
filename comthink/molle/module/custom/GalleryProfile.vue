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
      :permission="stylePermission"
    )

</template>

<script lang="ts">
  import {Component} from "nuxt-property-decorator";
  import {Profile} from "~/molle/module/Profile";
  import StyleComp from "~/molle/ui/property/StyleComp.vue";

  @Component({
    components: {StyleComp}
  })
  export default class GalleryProfile extends Profile {
    //style setting
    stylePermission = {
      container: false,
      border: false,
      margin: "",
      padding: "",
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    };
  }
</script>

<style lang="scss">
</style>
