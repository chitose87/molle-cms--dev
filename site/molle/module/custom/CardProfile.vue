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
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import {Profile} from "~/molle/module/Profile";
import {StyleAlign} from "~/molle/Singleton";

@Component({
  components: {StyleComp}
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
}
</script>

<style lang="scss">
</style>
