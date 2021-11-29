<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Profile} from "../Profile";
import StyleComp from "../../ui/property/StyleComp.vue";
import {StyleAlign} from "../../Singleton";
import ButtonList from "./ButtonList.vue";

@Component({
  components: {StyleComp},
})
export default class ButtonListProfile extends Profile {
  static readonly CLASS_NAME = "ButtonListProfile";
  static readonly LANGS = {
    en: ButtonList.CLASS_NAME,
    jp: "ボタンリスト",
  };
  static readonly custom = {
    // src: {label: Vue.prototype.$words.src, value: Vue.prototype.$words.url},
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    align: StyleAlign.None,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };

  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Button"},
      ],
    },
    convert: ["AnchorNavi"],
    white: ["Button"],
    icon: "layout-three-columns",
  };
}
</script>

<style lang="scss">
</style>
