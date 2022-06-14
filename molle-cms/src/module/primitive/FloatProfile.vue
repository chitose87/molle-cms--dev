<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";

@Component({
  components: {StyleComp},
})
export default class FloatProfile extends Profile {
  static readonly CLASS_NAME = "FloatProfile";
  static readonly LANGS = {
    en: "Float",
    jp: "フロート",
  };

  // custom
  static readonly custom = {};

  //style setting
  static readonly stylePermission = {
    container: false,
    border: false,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "-quote"]},
    // color: {default: "", select: ["", "-dark"]},
  };
  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Paragraph"},
      ],
    },
    icon: "pip",
  };
}
</script>

<style lang="scss">
</style>
