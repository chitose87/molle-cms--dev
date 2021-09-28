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
import List from "./List.vue";
import ListBox from "./ListBox.vue";

@Component({
  components: {StyleComp},
})
export default class ListBoxProfile extends Profile {
  static readonly CLASS_NAME = "ListBoxProfile";
  static readonly LANGS = {
    en: ListBox.CLASS_NAME,
    jp: "リストボックス",
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
    theme: {default: "-number", select: ["-number", "-circle", "-triangle", "-square"]},
  };

  static settings = {
    type: "children",
    white: [List],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
