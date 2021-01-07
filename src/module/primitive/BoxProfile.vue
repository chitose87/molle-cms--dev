<template lang="pug">
  div
    SelectOptionComp(
      :label="'タグ'",
      :select='["", "section"]'
      v-model="itemData.option.tag"
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
  import SelectOptionComp from "~/src/ui/property/SelectOptionComp.vue";
  import ChildrenOptionComp from "~/src/ui/property/ChildrenOptionComp.vue";
  import {Profile} from "~/src/module/Profile";

  @Component({
    components: {StyleComp, SelectOptionComp,ChildrenOptionComp}
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
