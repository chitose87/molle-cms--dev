<template lang="pug">
  div
    StyleComp(
      :itemData="itemData"
      :permission="stylePermission"
      @change="()=>$emit('change')"
    )
    label.form-inline
      span.mr-1 URL:
      input.form-control.form-control-sm(
        v-model="itemData.option.href"
        @change="()=>$emit('change')"
      )
    label.form-inline
      span.mr-1 ラベル:
      input.form-control.form-control-sm(
        v-model="itemData.value"
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
  import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
  import {Profile} from "~/molle-cms/src/module/Profile";
  import {StyleAlign} from "~/molle-cms/src/Singleton";

  @Component({
    components: {StyleComp}
  })
  export default class ButtonProfile extends Profile {
    //style setting
    stylePermission = {
      // border: false,
      // align: StyleAlign.None,
      // margin: "",
      // padding: "",
      theme: {default: "", select: ["", "-sm", "-lg"]},
      color: {default: "", select: ["", "-primary", "-secondary", "-link"]},
    };
    static settings = {
      type: "button",
      opt: {
        option: {
          href: "https://placehold.jp/",
          target: "",
        },
      },
      icon: "hand-index",
    }
  }
</script>

<style lang="scss">
</style>
