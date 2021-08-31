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
import StyleComp from "molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "molle-cms/src/module/Profile";
import TextAreaQuill from "molle-cms/src/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp}
})
export default class TopMessageProfile extends Profile {
  //style setting
  stylePermission = {
    border: true,
  };
}
</script>

<style lang="scss">
</style>
