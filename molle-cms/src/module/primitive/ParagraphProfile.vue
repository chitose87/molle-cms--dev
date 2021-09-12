<template lang="pug">
div
  TextAreaQuill(
    :label="$words.text+':'"
    v-model="itemData.value"
    @change="()=>$emit('change')"
  )

  label.form-inline
    span.mr-1 タグ:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in ['', 'span']" :value="item" v-html="item")

  StyleComp(
    :itemData="itemData"
    :permission="stylePermission"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import TextAreaQuill from "~/molle-cms/src/ui/property/TextAreaQuill.vue";
import Headline from "./Headline.vue";

@Component({
  components: {TextAreaQuill, StyleComp}
})
export default class ParagraphProfile extends Profile {
  static readonly CLASS_NAME = "ParagraphProfile";
  //style setting
  stylePermission = {
    border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-caption"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "text",
    convert: [Headline],
    icon: "text-paragraph",
  }
}
</script>

<style lang="scss">
</style>
