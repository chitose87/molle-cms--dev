<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

  InputUrlByGS(
    :label="'src:'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )
  InputUrlByGS(
    :label="'sp:'"
    v-model="itemData.option.sp"
    @change="()=>$emit('change')"
  )
  label alt:
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
import {Component} from "~/node_modules/nuxt-property-decorator";
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import {Profile} from "~/molle/module/Profile";
import {StyleAlign} from "~/molle/Singleton";
import GoogleStorage from "~/molle/ui/GoogleStorage.vue";
import InputUrlByGS from "~/molle/ui/property/InputUrlByGS.vue";

@Component({
  components: {InputUrlByGS, GoogleStorage, StyleComp}
})
export default class PictureProfile extends Profile {
  //style setting
  stylePermission = {
    border: false,
    align: StyleAlign.None,
    // margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-sm", "-lg"]},
    // color: {default: "", select: ["", "dark"]},
  };
}
</script>

<style lang="scss">
</style>
