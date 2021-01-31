<template lang="pug">
  div
    label.form-inline
      span.mr-1 Text:
      textarea.form-control.form-control-sm(
        v-model="itemData.value"
        @change="()=>$emit('change')"
      )
    label.form-inline
      span.mr-1 見出しレベル:
      select.form-control.form-control-sm(
        v-model="itemData.option.lv"
        @change="()=>$emit('change')"
      )
        option(v-for='item in ["h1", "h2", "h3", "h4", "h5", "h6"]' :value="item" v-html="item")

    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Profile} from "~/molle/module/Profile";
  import StyleComp from "~/molle/ui/property/StyleComp.vue";
  import {StyleAlign} from "~/molle/Singleton";

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
      theme: {default: "", select: ["", "decorate"]},
      color: {default: "", select: ["", "text-white"]},
    };
  }
</script>

<style lang="scss">
</style>
