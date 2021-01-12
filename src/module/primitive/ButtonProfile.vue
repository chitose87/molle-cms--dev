<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      :permission="stylePermission"
      @change="()=>$emit('change')"
    )
    label.form-inline
      span.mr-1 URL:
      input.form-control.form-control-sm(
        v-model="itemData.value.href"
        @change="()=>$emit('change')"
      )
    label.form-inline
      span.mr-1 ラベル:
      input.form-control.form-control-sm(
        v-model="itemData.value.label"
        @change="()=>$emit('change')"
      )
    label.form-inline
      span.mr-1 ターゲット:
      select.form-control.form-control-sm(
        v-model="itemData.option.target"
        @change="()=>$emit('change')"
      )
        option(v-for='item in ["", "_self", "_blank"]' :value="item" v-html="item")

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import {Profile} from "~/src/module/Profile";
  import {StyleAlign} from "~/src/Singleton";

  @Component({
    components: {StyleComp}
  })
  export default class ButtonProfile extends Profile {
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
