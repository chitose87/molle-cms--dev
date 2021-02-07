<template lang="pug">
  div
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
  import StyleComp from "~/molle/ui/property/StyleComp.vue";
  import ChildrenOptionComp from "~/molle/ui/property/ChildrenOptionComp.vue";
  import {Profile} from "~/molle/module/Profile";

  @Component({
    components: {StyleComp,ChildrenOptionComp}
  })
  export default class ModalProfile extends Profile {
    //style setting
    stylePermission = {
      container: false,
      border: false,
      margin: "",
      padding: "",
      // theme: {default: "", select: ["", "-quote"]},
      // color: {default: "", select: ["", "-dark"]},
    };
  }
</script>

<style lang="scss">
</style>
