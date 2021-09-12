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
import DevModuleGuide from "./DevModuleGuide.vue";

@Component({
  components: {StyleComp},
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
