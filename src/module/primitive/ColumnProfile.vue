<template lang="pug">
  div
    InputOptionComp(
      :label="'基本カラムサイズ'",
      v-model="itemData.option.flexBasis"
      @change="()=>$emit('change')"
    )
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
  import {Profile} from "~/src/module/Profile";
  import InputOptionComp from "~/src/ui/property/InputOptionComp.vue";
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import ChildrenOptionComp from "~/src/ui/property/ChildrenOptionComp.vue";

  @Component({
    components: {ChildrenOptionComp, InputOptionComp,StyleComp}
  })
  export default class ColumnProfile extends Profile {
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
