<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )
    label.form-inline
      span.mr-1 タグ:
      select.form-control.form-control-sm(
        v-model="itemData.option.tag"
        @change="()=>$emit('change')"
      )
        option(v-for="item in ['', 'section']" :value="item" v-html="item")

    ChildrenOptionComp(
      :moduleId="itemData.moduleId"
      v-model="itemData.value"
      @change="()=>$emit('change')"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/src/ui/property/StyleComp.vue";
  import ChildrenOptionComp from "~/src/ui/property/ChildrenOptionComp.vue";
  import {Profile} from "~/src/module/Profile";

  @Component({
    components: {StyleComp,ChildrenOptionComp}
  })
  export default class BoxProfile extends Profile {
    //style setting
    stylePermission = {
      container: false,
      border: false,
      margin: "",
      padding: "",
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    };
  }
</script>

<style lang="scss">
</style>
