<template lang="pug">
div
  label.form-inline
    span.mr-1 タグ:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in ['', 'section']" :value="item" v-html="item")

  label {{$words.bg}}:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.bg"
      @change="(e)=>validation(e.target.value,itemData.option,'bg')"
    )
  label {{$words.bg}} {{$words.sp}}:
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
      span {{$words.explorer}}
    a.btn.btn-info.btn-sm.btn-block(
      @click="()=>$root.$emit('google-storage-upload',(url)=>{uploaded=url})"
    )
      span {{$words.upload}}

    div(v-if="uploaded")
      label {{$words.complete}}
        input.form-control.form-control-sm(:value="uploaded")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )


</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "~/molle/module/primitive/ColumnBox.vue";
import Box from "~/molle/module/primitive/Box.vue";

@Component({
  components: {StyleComp},
})
export default class BackgroundBoxProfile extends Profile {
  static readonly CLASS_NAME = "BackgroundBoxProfile";
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

  static settings = {
    type: "children",
    black: [ColumnBox],
    convert: [Box, ColumnBox],
    icon: "plus-square",
  };

  uploaded = "";

  validation(str: string, obj: any, name: string) {
    if (/firebasestorage.googleapis.com/.test(str)) {
      str = str.match(".+/(.+?)([\?#;].*)?$")![1];
      str = `https://storage.googleapis.com/${process.env.storageBucket}/${decodeURIComponent(str)}`;
      this.$set(obj, name, str);
    }
    this.$emit("change");
  }
}
</script>

<style lang="scss">
</style>
