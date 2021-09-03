<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Profile} from "~/molle-cms/src/module/Profile";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import Button from "~/molle/module/primitive/Button.vue";

@Component({
  components: {StyleComp},
})
export default class ButtonListProfile extends Profile {
  //style setting
  stylePermission = {
    // container: false,
    // border: false,
    align: StyleAlign.None,
    margin: "",
    padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };

  static settings = {
    type: "children",
    white: [Button],
    icon: "layout-three-columns",
  };
}
</script>

<style lang="scss">
</style>
