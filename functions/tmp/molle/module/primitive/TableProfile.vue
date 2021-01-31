<template lang="pug">
div
  StyleComp(
    :itemData="itemData",
    :permission="stylePermission",
    @change="() => $emit('change')"
  )
  label.form-inline
    span.mr-1 CSV:
    textarea.form-control.form-control-sm(
      v-model="itemData.value",
      placehholder="csv only",
      @change="() => $emit('change')"
    )

  label.form-inline
    span.mr-1 行見出し:
    input.form-control.form-control-sm(
      v-model="itemData.option.lineHeading",
      type="checkbox",
      @change="() => $emit('change')"
    )
  label.form-inline
    span.mr-1 列見出し:
    input.form-control.form-control-sm(
      v-model="itemData.option.columnHeading",
      type="checkbox",
      @change="() => $emit('change')"
    )
</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import StyleComp from "~/molle/ui/property/StyleComp.vue";
import {Profile} from "~/molle/module/Profile";
import {StyleAlign} from "~/molle/Singleton";

@Component({
  components: {StyleComp},
})
export default class TableProfile extends Profile {
  //style setting
  stylePermission = {
    border: false,
    align: StyleAlign.None,
    margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
}
</script>

<style lang="scss">
</style>
