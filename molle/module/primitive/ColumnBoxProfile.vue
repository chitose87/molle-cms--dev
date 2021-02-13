<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )

    label
      span.mr-1 カラム幅:
      .form-inline
        input.form-control.form-control-sm(
          v-model="itemData.option.col"
          @change="()=>{$set(itemData.option,'col',Math.max(Math.min(Math.floor(itemData.option.col),12),-1));$emit('change')}"
          type="number"
          min="-1" max="12" step="1"
        )
        span /12
    label
      span.mr-1 カラム幅-SP:
      .form-inline
        input.form-control.form-control-sm(
          v-model="itemData.option.colSm"
          @change="()=>{$set(itemData.option,'colSm',Math.max(Math.min(Math.floor(itemData.option.colSm),12),-1));$emit('change')}"
          type="number"
          min="-1" max="12" step="1"
        )
        span /12
    p.caption *-1=auto
    p.caption *0=未設定

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
      // container: false,
      // border: false,
      // margin: "",
      // padding: "",
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    };
  }
</script>

<style lang="scss">
</style>
