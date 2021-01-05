<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      :permission="stylePermission"
      @change="()=>$emit('change')"
    )
    TextareaOptionComp(
      :label="'Text'"
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import {Profile} from "~/src/module/Profile";
  import {StyleAlign} from "~/src/Singleton";
  import TextareaOptionComp from "~/src/ui/property/TextareaOptionComp.vue";

  @Component({
    components: {TextareaOptionComp, StyleComp}
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
