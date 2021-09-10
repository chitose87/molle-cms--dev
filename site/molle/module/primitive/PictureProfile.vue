<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

  InputUrlByGS(
    :label="[$words.src]+':'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )
  InputUrlByGS(
    :label="[$words.src]+' '+[$words.sp]+':'"
    v-model="itemData.option.sp"
    @change="()=>$emit('change')"
  )
  label {{$words.alt}}:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.alt"
      @change="()=>$emit('change')"
    )

  GoogleStorage

  //a.btn.btn-secondary.btn-sm(href="https://console.firebase.google.com/project/" + process.env.projectId + "/storage/" + process.env.storageBucket + "/files~2Fimages?hl=ja" target="_blank")
    span Storage

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import GoogleStorage from "~/molle-cms/src/ui/GoogleStorage.vue";
import InputUrlByGS from "~/molle-cms/src/ui/property/InputUrlByGS.vue";

@Component({
  components: {InputUrlByGS, GoogleStorage, StyleComp},
})
export default class PictureProfile extends Profile {
  static readonly CLASS_NAME = "PictureProfile";
  //style setting
  stylePermission = {
    border: false,
    align: StyleAlign.None,
    // margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-sm", "-lg"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "picture",
    opt: {
      option: {
        sp: "",
        alt: "",
      },
    },
    icon: "image",
  };
}
</script>

<style lang="scss">
</style>
