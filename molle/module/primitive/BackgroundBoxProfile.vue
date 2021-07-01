<template lang="pug">
div
  label.form-inline
    span.mr-1 タグ:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in ['', 'section']" :value="item" v-html="item")

  label Background:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.bg"
      @change="(e)=>validation(e.target.value,itemData.option,'bg')"
    )
  label Background sp:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.bgSp"
      @change="(e)=>validation(e.target.value,itemData.option,'bgSp')"
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

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )


</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import {Profile} from "~/molle/module/Profile";

@Component({
  components: {StyleComp}
})
export default class BackgroundBoxProfile extends Profile {
  //style setting
  stylePermission = {
    container: false,
    "container-fluid": false,
    section: false,
    border: false,
    margin: "",
    padding: "",
    theme: {default: "", select: ["", "-quote"]},
    color: {default: "", select: ["", "-dark"]},
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
