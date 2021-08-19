<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
    :permission="stylePermission"
  )
  label.form-inline
    span.mr-1 URL:
    input.form-control.form-control-sm(
      v-model="itemData.option.href"
      @change="()=>$emit('change')"
    )

  label.form-inline
    span.mr-1 ターゲット:
    select.form-control.form-control-sm(
      v-model="itemData.option.target"
      @change="()=>$emit('change')"
    )
      option(v-for='item in ["", "_self", "_blank"]' :value="item" v-html="item")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import StyleComp from "molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "molle-cms/src/module/Profile";

@Component({
  components: {StyleComp},
})
export default class LinkBoxProfile extends Profile {
  //style setting
  stylePermission = {
    // border: false,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "-overlay", "-right", "-left", "-sm-right", "-sm-left", "-quote"]},
    // color: {default: "", select: ["", "-dark", "-gray", "-gray-box"]},
  };
}
</script>

<style lang="scss">
</style>
