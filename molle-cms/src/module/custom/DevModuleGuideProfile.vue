<template lang="pug">
div
  label.form-inline
    span.mr-1 {{$words.module}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.module"
      @change="()=>$emit('change')"
    )
      option(v-for="item in $molleModuleList" :value="item.ref.CLASS_NAME" v-html="item.ref.CLASS_NAME")

  TextAreaQuill(
    :label="$words.description+':'"
    v-model="itemData.option.description"
    @change="()=>$emit('change')"
  )

  TextAreaQuill(
    :label="$words.memo+':'"
    v-model="itemData.option.memo"
    @change="()=>$emit('change')"
  )

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import DevModuleGuide from "./DevModuleGuide.vue";
import TextAreaQuill from "../../ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class DevModuleGuideProfile extends Profile {
  static readonly CLASS_NAME = "DevModuleGuideProfile";
  static readonly LANGS = {
    en: DevModuleGuide.CLASS_NAME,
    jp: "モジュールガイド",
  };
  //style setting
  static readonly stylePermission = {
    margin: "",
    padding: "",
  };

  static settings = {
    type: "children",
    black: ["DevModuleGuide"],
    icon: "archive-fill",
    opt: {
      option: {
        module: "Box",
        description: "description",
        memo: "memo",
      },
    },
  };
}
</script>

<style lang="scss">
</style>
