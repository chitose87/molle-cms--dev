<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      :onUpdate="onUpdate"
      :permission="stylePermission"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import {Profile} from "~/src/module/Profile";
  import {StyleAlign} from "~/src/Singleton";

  @Component({
    components: {StyleComp}
  })
  export default class ParagraphProfile extends Profile {
    //style setting
    stylePermission = {
      border: false,
      align: StyleAlign.None,
      margin: "",
      // padding: "",
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    };
  }
</script>

<style lang="scss">
</style>
