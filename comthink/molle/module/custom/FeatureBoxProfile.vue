<template lang="pug">
div
  label.form-inline
    span.mr-1 {{$words.tag}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in ['', 'section']" :value="item" v-html="item")

  TextAreaQuill(
    :label="$words.title+':'"
    v-model="itemData.option.title"
    @change="()=>$emit('change')"
  )

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"

  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import TextAreaQuill from "~/molle-cms/src/ui/property/TextAreaQuill.vue";
import Feature from "~/molle/module/custom/Feature.vue";
import FeatureBox from "./FeatureBox.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class FeatureBoxProfile extends Profile {
  static readonly CLASS_NAME = "FeatureBoxProfile";
  static readonly LANGS = {
    en:  FeatureBox.CLASS_NAME,
    jp: "説明ボックス",
  };
  //style setting
  static readonly stylePermission = {
    container: false,
    "container-fluid": false,
    section: false,
    border: false,
    margin: "",
    padding: "",
    theme: {default: "", select: ["", "-sub -right", "-sub -left"]},
  };

  static settings = {
    type: "children",
    opt: {
      option: {
        title: "Lorem ipsum...",
      },
    },
    white: [Feature],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
