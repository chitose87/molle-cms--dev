<template lang="pug">
div
  label.form-inline
    span.mr-1 タグ:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in ['', 'section']" :value="item" v-html="item")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"

  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import Picture from "~/molle/module/primitive/Picture.vue";
import Headline from "~/molle/module/primitive/Headline.vue";

@Component({
  components: {StyleComp},
})
export default class SlideShowProfile extends Profile {
  static readonly CLASS_NAME = "SlideShowProfile";
  //style setting
  static readonly stylePermission = {
    container: false,
    "container-fluid": false,
    section: false,
    border: false,
    margin: "",
    padding: "",
    theme: {default: "", select: ["", "-fade"]},
  };

  static settings = {
    type: "group",
    opt: {
      value: {
        img1: {fixedModuleId: "Picture", order: 0},
        img2: {fixedModuleId: "Picture", order: 10},
        img3: {fixedModuleId: "Picture", order: 20},
        headline: {fixedModuleId: "Headline", order: 30},
      },
    },
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
