<template lang="pug">
div
  label.form-inline
    span.mr-1 {{custom.tag.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in custom.tag.select" :value="item" v-html="item")

  label {{custom.bg.label}}:
    input.form-control.form-control-sm(
      type="text"
      v-model="itemData.option.bg"
      @change="(e)=>validation(e.target.value,itemData.option,'bg')"
    )
  label {{custom.bgSp.label}}:
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
      span {{custom.explorer.label}}
    a.btn.btn-info.btn-sm.btn-block(
      @click="()=>$root.$emit('google-storage-upload',(url)=>{uploaded=url})"
    )
      span {{custom.upload.label}}

    div(v-if="uploaded")
      label {{custom.complete.label}}
        input.form-control.form-control-sm(:value="uploaded")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"

  )


</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "./ColumnBox.vue";
import Box from "./Box.vue";
import BackgroundBox from "./BackgroundBox.vue";

@Component({
  components: {StyleComp},
})
export default class BackgroundBoxProfile extends Profile {
  static readonly CLASS_NAME = "BackgroundBoxProfile";
  static readonly LANGS = {
    en: BackgroundBox.CLASS_NAME,
    jp: "背景ボックス",
  };
  // custom
  static readonly custom = {
    bg: {label: Vue.prototype.$words.bg, value: Vue.prototype.$words.url},
    bgSp: {
      label: Vue.prototype.$words.bg + "-" + Vue.prototype.$words.sp,
      value: Vue.prototype.$words.url,
    },
    tag: {
      label: Vue.prototype.$words.tag,
      default: "",
      select: ["", "section"],
    },
    explorer: {label: Vue.prototype.$words.explorer, value: "Google Storageへのリンク"},
    upload: {label: Vue.prototype.$words.upload, value: "Google Storageにファイルをアップロード"},
    complete: {
      label: Vue.prototype.$words.complete,
      value: "ファイルの" + Vue.prototype.$words.upload + "先URL",
    },
  };
  //style setting
  static readonly stylePermission = {
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
