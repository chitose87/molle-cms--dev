<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )
    label.form-inline
      span.mr-1 見出しレベル:
      select.form-control.form-control-sm(
        v-model="itemData.option.lv"
        @change="()=>$emit('change')"
      )
        option(v-for='item in ["h1", "h2", "h3", "h4", "h5", "h6"]' :value="item" v-html="item")

    label.form-inline
      span.mr-1 Text:
      textarea.form-control.form-control-sm(
        v-model="itemData.value"
        @change="()=>$emit('change')"
      )
</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Profile} from "~/src/module/Profile";
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import {StyleAlign} from "~/src/Singleton";

  @Component({
    components: {StyleComp}
  })
  export default class HeadlineProfile extends Profile {
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
