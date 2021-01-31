<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )

    label.form-inline
      span.mr-1 カラムサイズ:
      input.form-control.form-control-sm(
        v-model="itemData.option.flexBasis"
        @change="()=>$emit('change')"
      )

    ChildrenOptionComp(
      :moduleId="itemData.moduleId"
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/ui/property/StyleComp.vue";
  import {Profile} from "~/molle/module/Profile";
  import ChildrenOptionComp from "~/molle/ui/property/ChildrenOptionComp.vue";

  @Component({
    components: {ChildrenOptionComp, StyleComp}
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
