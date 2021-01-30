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
    ChildrenOptionComp(
      :moduleId="itemData.moduleId"
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Profile} from "~/molle/module/Profile";
  import StyleComp from "~/molle/ui/property/StyleComp.vue";
  import ChildrenOptionComp from "~/molle/ui/property/ChildrenOptionComp.vue";

  @Component({
    components: {ChildrenOptionComp, StyleComp}
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
