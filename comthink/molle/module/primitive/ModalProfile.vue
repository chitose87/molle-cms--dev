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

  @Component({
    components: {StyleComp}
  })
  export default class ModalProfile extends Profile {
  static readonly CLASS_NAME = "ModalProfile";
    //style setting
    stylePermission = {
      container: false,
      border: false,
      margin: "",
      padding: "",
      // theme: {default: "", select: ["", "-quote"]},
      // color: {default: "", select: ["", "-dark"]},
    };
    static settings = {
      type: "children",
      icon: "pip",
    }
  }
</script>

<style lang="scss">
</style>
