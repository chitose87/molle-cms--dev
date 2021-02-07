<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

  label src:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.value"
      @change="(e)=>validation(e.target.value,itemData,'value')"
    )
  label sp:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.sp"
      @change="(e)=>validation(e.target.value,itemData.option,'sp')"
    )
  label alt:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.alt"
      @change="()=>$emit('change')"
    )

  //Google Storage
  .google-storage.border.p-2.mt-3
    label Google Storage
    a.btn.btn-info.btn-sm.btn-block.mb-2(
      @click="()=>$root.$emit('google-storage-view')"
    )
      span Explorer
    a.btn.btn-info.btn-sm.btn-block(
      @click="()=>$root.$emit('google-storage-upload',(url)=>{uploaded=url})"
    )
      span Upload

    div(v-if="uploaded")
      label Complete
        input.form-control.form-control-sm(:value="uploaded")

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

  uploaded = "";

  validation(str: string, obj: any, name: string) {
    if (/firebasestorage.googleapis.com/.test(str)) {
      str = str.match(".+/(.+?)([\?#;].*)?$")![1];
      str = `https://storage.googleapis.com/${process.env.storageBucket}/${decodeURIComponent(str)}`
      this.$set(obj, name, str);
    }
    this.$emit('change')
  }
}
</script>

<style lang="scss">
</style>
