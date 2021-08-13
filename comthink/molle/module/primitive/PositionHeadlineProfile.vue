<template lang="pug">
  div
    TextAreaQuill(
      :label="'Text:'"
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )

    TextAreaQuill(
      :label="'subText:'"
      v-model="itemData.option.text"
      @change="()=>$emit('change')"
    )

    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )

</template>

<script lang="ts">
  import {Component} from "nuxt-property-decorator";
  import {Profile} from "molle-cms/src/module/Profile";
  import StyleComp from "molle-cms/src/ui/property/StyleComp.vue";
  import TextAreaQuill from "molle-cms/src/ui/property/TextAreaQuill.vue";

  @Component({
    components: {TextAreaQuill, StyleComp}
  })
  export default class PositionHeadlineProfile extends Profile {
    //style setting
    stylePermission = {
      // border: false,
      // theme: {default: "", select: ["", "decorate"]},
      color: {default: "", select: ["", "text-white"]},
    };
  }
</script>

<style lang="scss">
</style>
