<template lang="pug">
div
  TextAreaQuill(
    :label="'Text:'"
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
import {Component} from "~/node_modules/nuxt-property-decorator";
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import {Profile} from "~/molle/module/Profile";
import {StyleAlign} from "~/molle/Singleton";
import TextAreaQuill from "~/molle/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp}
})
export default class ParagraphProfile extends Profile {
  //style setting
  stylePermission = {
    border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    theme: {default: "", select: ["", "-caption"]},
    // color: {default: "", select: ["", "dark"]},
  };
}
</script>

<style lang="scss">
</style>
