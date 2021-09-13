<template lang="pug">
div
  TextAreaQuill(
    :label="'memo:'"
    v-model="itemData.option.memo"
    @change="()=>$emit('change')"
  )

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import DevModuleGuide from "./DevModuleGuide.vue";
import TextAreaQuill from "~/molle-cms/src/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class DevModuleGuideProfile extends Profile {
  static readonly CLASS_NAME = "DevModuleGuideProfile";
  //style setting
  static readonly stylePermission = {
    margin: "",
    padding: "",
  };

  static settings = {
    type: "children",
    black: [DevModuleGuide],
    icon: "plus-square",
  };
}
</script>

<style lang="scss">
</style>
