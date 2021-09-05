<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )
    label.form-inline
      span.mr-1 Don't Facebook:
      input.form-control.form-control-sm(
        v-model="itemData.option.noFacebook",
        type="checkbox",
        @change="() => $emit('change')"
      )
    label.form-inline
      span.mr-1 Don't Twitter:
      input.form-control.form-control-sm(
        v-model="itemData.option.noTwitter",
        type="checkbox",
        @change="() => $emit('change')"
      )

</template>

<script lang="ts">
  import {Component} from "nuxt-property-decorator";
  import {Profile} from "~/molle-cms/src/module/Profile";
  import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
  import {StyleAlign} from "~/molle-cms/src/Singleton";

  @Component({
    components: {StyleComp}
  })
  export default class SocialShareProfile extends Profile {
  static readonly CLASS_NAME = "SocialShareProfile";
    //style setting
    stylePermission = {
      // border: false,
      align: StyleAlign.None,
      margin: "",
      // padding: "",
      // theme: {default: "", select: ["", "decorate"]},
      // color: {default: "", select: ["", "text-white"]},
    };
    static settings = {
      type: "any",
      icon: "share",
    }
  }
</script>

<style lang="scss">
</style>
