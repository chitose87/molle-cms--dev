<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )
  label.form-inline
    span.mr-1 {{$words.url}}:
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
import ColumnBox from "./ColumnBox.vue";
import Box from "./Box.vue";
import BackgroundBox from "./BackgroundBox.vue";
import IsviewBox from "./IsviewBox.vue";

@Component({
  components: {StyleComp},
})
export default class LinkBoxProfile extends Profile {
  static readonly CLASS_NAME = "LinkBoxProfile";
  //style setting
  stylePermission = {};

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
