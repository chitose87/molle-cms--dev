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
import {Profile} from "~/molle/module/Profile";
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import {StyleAlign} from "~/molle/Singleton";

@Component({
  components: {StyleComp}
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
}
</script>

<style lang="scss">
</style>
