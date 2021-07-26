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
import {Component} from "nuxt-property-decorator";
import StyleComp from "molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "molle-cms/src/module/Profile";
import {StyleAlign} from "molle-cms/src/Singleton";
import TextAreaQuill from "molle-cms/src/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp}
})
export default class PositionParagraphProfile extends Profile {
  //style setting
  stylePermission = {
    border: false,
    theme: {default: "", select: ["", "-caption"]},
    position: {default: "", select: ["", "high","center","low"]},
  };
}
</script>

<style lang="scss">
</style>
