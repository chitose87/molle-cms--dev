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
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import Picture from "~/molle/module/primitive/Picture.vue";
import Paragraph from "~/molle/module/primitive/Paragraph.vue";

@Component({
  components: {StyleComp},
})
export default class CardProfile extends Profile {
  //style setting
  stylePermission = {
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
        img: {fixedModuleId: "Picture", order: 0},
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
