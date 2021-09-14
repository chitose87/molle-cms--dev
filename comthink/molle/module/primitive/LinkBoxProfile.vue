<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"

  )
  label.form-inline
    span.mr-1 URL:
    input.form-control.form-control-sm(
      v-model="itemData.option.href"
      @change="()=>$emit('change')"
    )

  label.form-inline
    span.mr-1 ターゲット:
    select.form-control.form-control-sm(
      v-model="itemData.option.target"
      @change="()=>$emit('change')"
    )
      option(v-for='item in ["", "_self", "_blank"]' :value="item" v-html="item")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "~/molle/module/primitive/ColumnBox.vue";
import Box from "~/molle/module/primitive/Box.vue";
import BackgroundBox from "~/molle/module/primitive/BackgroundBox.vue";
import IsviewBox from "~/molle/module/primitive/IsviewBox.vue";

@Component({
  components: {StyleComp},
})
export default class LinkBoxProfile extends Profile {
  static readonly CLASS_NAME = "LinkBoxProfile";
  static readonly LANGS = {
    en:  .CLASS_NAME,
    jp: "",
  };
  //style setting
  static readonly stylePermission = {};

  static settings = {
    type: "children",
    black: [ColumnBox],
    convert: [Box, BackgroundBox, IsviewBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
