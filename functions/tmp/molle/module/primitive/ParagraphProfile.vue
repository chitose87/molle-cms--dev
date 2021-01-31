<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      :permission="stylePermission"
      @change="()=>$emit('change')"
    )
    label.form-inline
      span.mr-1 Text:
      textarea.form-control.form-control-sm(
        v-model="itemData.value"
        @change="()=>$emit('change')"
      )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/ui/property/StyleComp.vue";
  import {Profile} from "~/molle/module/Profile";
  import {StyleAlign} from "~/molle/Singleton";

  @Component({
    components: {StyleComp}
  })
  export default class ParagraphProfile extends Profile {
    //style setting
    stylePermission = {
      border: false,
      align: StyleAlign.None,
      margin: "",
      // padding: "",
      theme: {default: "", select: ["", "-caption"]},
      // color: {default: "", select: ["", "dark"]},
    };
  }
</script>

<style lang="scss">
</style>
