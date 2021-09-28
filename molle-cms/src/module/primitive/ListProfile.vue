<template lang="pug">
div
  label.form-inline
    span.mr-1 {{custom.tag.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in custom.tag.select" :value="item" v-html="item")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ListItemBox from "./ListItemBox.vue";
import List from "./List.vue";

@Component({
  components: {StyleComp},
})
export default class ListProfile extends Profile {
  static readonly CLASS_NAME = "ListProfile";
  static readonly LANGS = {
    en: List.CLASS_NAME,
    jp: "リスト",
  };
  // custom
  static readonly custom = {
    tag: {
      label: Vue.prototype.$words.tag,
      default: "",
      select: ["", "section"],
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
  };

  static settings = {
    type: "children",
    white: [ListItemBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
