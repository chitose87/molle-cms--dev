<template lang="pug">
div
  label.w-100
    span {{custom.itemId.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p ---

    input.form-control.form-control-sm(
      type="url"
      v-model="itemData.value.id"
      @change="()=>$emit('change')"
    )
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import {Profile} from "../Profile";

@Component({
  components: {StyleComp},
})
export default class ReferenceProfile extends Profile {
  static readonly CLASS_NAME = "ReferenceProfile";
  static readonly LANGS = {
    en: ReferenceProfile.CLASS_NAME,
    jp: "参照",
  };

  // custom
  static readonly custom = {
    itemId: {label: Vue.prototype.$words.itemId},
  };

  //style setting
  static readonly stylePermission = {
    // border: false,
    // align: StyleAlign.None,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "-sm", "-lg", "-non-scale"]},
    // color: {default: "", select: ["", "dark"]},
  };

  static settings = {
    type: "any",
    opt: {
      value: {},
    },
    icon: "image",
  };
}
</script>

<style lang="scss">
[data-molle-reference="true"] {
  * {
    pointer-events: none;
  }
}
</style>
