<template lang="pug">
div
  details.molle-guide
    summary
    .molle-guide__body.caption
      p Listの中にListを置くと階層を下げることができます。

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

  details.molle-guide
    summary
    .molle-guide__body.caption
      p {{$words.marker}}の種類を{{$words.theme}}で選択できます。<br>
        | 最上位のListには{{$words.marker}}がつきません。<br>
        | {{$words.theme}}を”-none”にすると、直下のListの{{$words.marker}}がなくなります。

  .list-checker.form-control
    div.list(:class="itemData.class.theme")
      p.paragraph(v-html="'Lorem ipsum...'")
      div.list
        p.paragraph(v-html="'Lorem ipsum...'")
        div.list
          p.paragraph(v-html="'Lorem ipsum...'")

</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import ColumnBox from "./ColumnBox.vue";
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
  static readonly custom = {};
  //style setting
  static readonly stylePermission = {
    // container: false,
    // "container-fluid": false,
    // section: false,
    // border: false,
    margin: "",
    padding: "",
    theme: {default: "-disc", select: ["-none", "-number", "-disc"]},
  };

  static settings = {
    type: "children",
    black: [ColumnBox],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
.list-checker {
  &.form-control {
    height: auto;
  }
}

</style>
