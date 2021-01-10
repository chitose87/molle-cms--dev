<template lang="pug">
  div
    InputOptionComp(
      :label="'カラムサイズ'",
      v-model="itemData.option.flexBasis"
      @change="()=>$emit('change')"
    )

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
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import {Profile} from "~/src/module/Profile";
  import ChildrenOptionComp from "~/src/ui/property/ChildrenOptionComp.vue";
  import InputOptionComp from "~/src/ui/property/InputOptionComp.vue";

  @Component({
    components: {ChildrenOptionComp, StyleComp, InputOptionComp}
  })
  export default class ColumnBoxProfile extends Profile {
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
