<template lang="pug">
div
  InputUrlByGS(
    :label="custom.bg.label+':'"
    v-model="itemData.option.bg"
    @change="()=>$emit('change')"
  )
  InputUrlByGS(
    :label="custom.bgSp.label+':'"
    v-model="itemData.option.bgSp"
    @change="()=>$emit('change')"
  )

  GoogleStorage

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import BackgroundBox from "./BackgroundBox.vue";
import GoogleStorage from "../../ui/GoogleStorage.vue";
import InputUrlByGS from "../../ui/property/InputUrlByGS.vue";

@Component({
  components: {StyleComp, GoogleStorage, InputUrlByGS},
})
export default class BackgroundBoxProfile extends Profile {
  static readonly CLASS_NAME = "BackgroundBoxProfile";
  static readonly LANGS = {
    en: BackgroundBox.CLASS_NAME,
    jp: "背景ボックス",
  };
  // custom
  static readonly custom = {
    bg: {label: Vue.prototype.$words.bg, value: Vue.prototype.$words.url},
    bgSp: {
      label: Vue.prototype.$words.bg + "-" + Vue.prototype.$words.sp,
      value: Vue.prototype.$words.url,
    },
  };
  //style setting
  static readonly stylePermission = {
    css: true,
    color: {default: "", select: ["", "-dark"]},
    space: {default: "", select: [...StyleComp.spaceSelect]},
  };

  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    black: ["ColumnBox"],
    convert: ["Box", "ColumnBox"],
    icon: "plus-square",
  };

  uploaded = "";
}
</script>

<style lang="scss">
</style>
