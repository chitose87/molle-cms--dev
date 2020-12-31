<template lang="pug">
  div
    SelectOptionComp(
      :label="'タグ'",
      :select='["", "section"]'
      :data="itemData.option || {}"
      :dataKey="'tag'"
      @change="(v)=>onUpdate('option',v)"
    )
    StyleComp(
      :itemData="itemData"
      :onUpdate="onUpdate"
      :permission="stylePermission"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import SelectOptionComp from "~/src/ui/property/SelectOptionComp.vue";
  import {Profile} from "~/src/module/Profile";

  @Component({
    components: {StyleComp, SelectOptionComp}
  })
  export default class BoxProfile extends Profile {
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
