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
// import {StyleAlign} from "~/molle-cms/src/Singleton";

@Component({
  components: {StyleComp},
})
export default class LabelCardProfile extends Profile {
  static readonly CLASS_NAME = "LabelCardProfile";
  //style setting
  static readonly stylePermission = {
    // border: false,
    // align: StyleAlign.None,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "-sm", "-lg"]},
    // color: {default: "", select: ["", "dark"]},
  };

  static settings = {
    type: "group",
    opt: {
      value: {
        img: {fixedModuleId: "Embed", order: 0},
        headline: {fixedModuleId: "Paragraph", order: 10},
        text: {fixedModuleId: "Paragraph", order: 20},
      },
    },
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
