<template lang="pug">
div
  label.form-inline
    span.mr-1 タグ:
    select.form-control.form-control-sm(
      v-model="itemData.option.tag"
      @change="()=>$emit('change')"
    )
      option(v-for="item in ['', 'section']" :value="item" v-html="item")

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

@Component({
  components: {StyleComp}
})
export default class BoxProfile extends Profile {
  //style setting
  stylePermission = {
    container: false,
    "container-fluid": false,
    section: false,
    border: false,
    margin: "",
    padding: "",
    theme: {default: "", select: ["", "-quote"]},
    color: {default: "", select: ["", "-dark", "-gray", "-gray-box"]},
  };
}
</script>

<style lang="scss">
</style>
