<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )

    label.form-inline.mr-2 src:
      input.form-control.form-control-sm(
        type="text"
        v-model="itemData.value"
        @change="()=>$emit('change')"
      )
    label.form-inline.mr-2 sp:
      input.form-control.form-control-sm(
        type="text"
        v-model="itemData.option.sp"
        @change="()=>$emit('change')"
      )
    label.form-inline.mr-2 alt:
      input.form-control.form-control-sm(
        type="text"
        v-model="itemData.option.alt"
        @change="()=>$emit('change')"
      )

    //a.btn.btn-secondary.btn-sm(href="https://console.firebase.google.com/project/" + process.env.projectId + "/storage/" + process.env.storageBucket + "/files~2Fimages?hl=ja" target="_blank")
      span Storage

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/ui/property/StyleComp.vue";
  import {Profile} from "~/molle/module/Profile";

  @Component({
    components: {StyleComp}
  })
  export default class PictureProfile extends Profile {
    //style setting
    stylePermission = {
      border: false,
      //align: StyleAlign.None,
      margin: "",
      // padding: "",
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    };
  }
</script>

<style lang="scss">
</style>
