<template lang="pug">
  div
    label
      span.mr-1 lat:
      input.form-control.form-control-sm(
        type="nubmer"
        v-model="itemData.value.lat"
        @change="()=>$emit('change')"
      )
    label
      span.mr-1 lng:
      input.form-control.form-control-sm(
        type="nubmer"
        v-model="itemData.value.lng"
        @change="()=>$emit('change')"
      )
    label
      span.mr-1 marker title:
      input.form-control.form-control-sm(
        v-model="itemData.option.title"
        @change="()=>$emit('change')"
      )
    label
      span.mr-1 marker text:
      input.form-control.form-control-sm(
        v-model="itemData.option.text"
        @change="()=>$emit('change')"
      )
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )

</template>

<script lang="ts">
  import {Component} from "nuxt-property-decorator";
  import {Profile} from "~/molle-cms/src/module/Profile";
  import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";

  @Component({
    components: {StyleComp}
  })
  export default class GoogleMapProfile extends Profile {
  static readonly CLASS_NAME = "GoogleMapProfile";
    //style setting
    stylePermission = {
      // container: false,
      // border: false,
      // margin: "",
      // padding: "",
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    };
    static settings = {
      type: "any",
      icon: "geo-alt",
    }
  }
</script>

<style lang="scss">
</style>
