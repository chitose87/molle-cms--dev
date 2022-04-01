<template lang="pug">
div
  details.molle-guide
    summary
    .molle-guide__body.caption
      p 適用するアニメーションをテーマから選択します。

  label.form-inline
    span.mr-1 {{custom.once.label}}:
      input.form-control.form-control-sm(v-model="itemData.option.once" type="checkbox" @change="()=>$emit('change')")

    details.molle-guide
      summary
      .molle-guide__body.caption
        p ---
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";
import IsviewBox from "./IsviewBox.vue";

@Component({
  components: {StyleComp},
})
export default class IsviewBoxProfile extends Profile {
  static readonly CLASS_NAME = "IsviewBoxProfile";
  static readonly LANGS = {
    en: IsviewBox.CLASS_NAME,
    jp: "アニメーションボックス",
  };

  // custom
  static readonly custom = {
    once: {label: "once", value: true},
  };

  //style setting
  static readonly stylePermission = {
    theme: {default: "", select: ["", "-slide", "-fade"]},
  };

  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    black: ["ColumnBox"],
    convert: ["Box", "BackgroundBox", "LinkBox"],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
