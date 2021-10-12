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
import Modal from "./Modal.vue";

@Component({
  components: {StyleComp},
})
export default class ModalProfile extends Profile {
  static readonly CLASS_NAME = "ModalProfile";
  static readonly LANGS = {
    en: Modal.CLASS_NAME,
    jp: "モーダル",
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
