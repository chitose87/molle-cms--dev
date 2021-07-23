<template lang="pug">
div
  TextAreaQuill(
    :label="'Title:'"
    v-model="itemData.option.text"
    @change="()=>$emit('change')"
  )
  label
    span.mr-1 Min lv =
    span(v-html="itemData.option.minLv")
    input.form-control.form-control-sm(
      v-model="itemData.option.minLv"
      @change="()=>$emit('change')"
      type="range" min="1" :max="Math.min(10,itemData.option.maxLv)" step="1"
    )
  label
    span.mr-1 Max lv =
    span(v-html="itemData.option.maxLv")
    input.form-control.form-control-sm(
      v-model="itemData.option.maxLv"
      @change="()=>$emit('change')"
      type="range" :min="Math.max(1,itemData.option.minLv)" max="10" step="1"
    )

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Profile} from "molle-cms/src/module/Profile";
import StyleComp from "molle-cms/src/ui/property/StyleComp.vue";
import {StyleAlign} from "molle-cms/src/Singleton";
import TextAreaQuill from "molle-cms/src/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class RandomCardsProfile extends Profile {

  //style setting
  stylePermission = {
    // container: false,
    // border: false,
    // align: StyleAlign.None,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
}
</script>

<style lang="scss">
</style>
