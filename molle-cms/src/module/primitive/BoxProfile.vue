<template lang="pug">
div
  //label.form-inline
  //  span.mr-1 {{custom.tag.label}}:削除予定
  //  select.form-control.form-control-sm(
  //    v-model="itemData.option.tag"
  //    @change="()=>$emit('change')"
  //  )
  //    option(v-for="item in custom.tag.select" :value="item" v-html="item")

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

  //padding
  //label.form-inline
  //  span.mr-1 {{custom.padding.label}}:削除予定
  //  select.form-control.form-control-sm(
  //    v-model="itemData.class.padding"
  //    @change="()=>$emit('change')"
  //  )
  //    option(v-for="item in custom.padding.select" :value="item" v-html="item")
  //
  //  details.molle-guide
  //    summary
  //    .molle-guide__body.caption
  //      p 内側の余白

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";

@Component({
  components: {StyleComp},
})
export default class BoxProfile extends Profile {
  static readonly CLASS_NAME = "BoxProfile";
  static readonly LANGS = {
    en: "Box",
    jp: "ボックス",
  };
  // custom
  static readonly custom = {
    tag: {
      label: Vue.prototype.$words.tag,
      default: "",
      select: ["", "section"],
    },
    margin: {
      label: "margin",
      default: "",
      select: ["", "0", "sm", "md", "lg"],
    },
    padding: {
      label: "padding",
      default: "",
      select: ["", "0", "sm", "md", "lg"],
    },
  };
  //style setting
  static readonly stylePermission = {
    css: true,
    theme: {
      default: "",
      select: ["", "quote", "border -zone", "line -zone", "read-size", "read-size--left", "read-size--rigth"]
    },
    color: {default: "", select: ["", "secondary -zone", "light -zone"]},
    space: {default: "", select: [...StyleComp.spaceSelect]},
  };

  static settings = {
    type: "children",
    opt: {
      value: [],
    },
    black: ["ColumnBox", "List", "DataSet"],
    convert: ["Section", "ColumnBox", "BackgroundBox", "ListBox", "DataBox"],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
