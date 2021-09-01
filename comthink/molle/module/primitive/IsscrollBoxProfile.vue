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
export default class IsscrollBoxProfile extends Profile {
  //style setting
  stylePermission = {
    border: false,
    theme: {default: "", select: ["", "-top-only", "-under-only"]},
  };
}
</script>

<style lang="scss">
</style>
