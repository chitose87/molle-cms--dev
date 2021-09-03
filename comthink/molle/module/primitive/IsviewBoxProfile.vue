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

@Component({
  components: {StyleComp},
})
export default class IsviewBoxProfile extends Profile {
  //style setting
  stylePermission = {
    theme: {default: "", select: ["", "-slide", "-fade"]},
  };
}
</script>

<style lang="scss">
</style>
