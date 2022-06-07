<template lang="pug">
  div
    label.form-inline
      span.mr-1 {{custom.splits.label}}:
      select.form-control.form-control-sm(
        v-model="itemData.option.splits"
        @change="()=>$emit('change')"
      )
        option(value=3) 3
        option(value=2) 2
        option(value=1) 1

    label.form-inline
      span.mr-1 {{custom.splitsSp.label}}:
      select.form-control.form-control-sm(
        v-model="itemData.option.splitsSp"
        @change="()=>$emit('change')"
      )
        option(value=2) 2
        option(value=1) 1

    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
    )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {StyleAlign} from "~/molle-cms/src/Singleton";
import {Profile} from "~/molle-cms/src/module/Profile";

@Component({
  components: {StyleComp},
})
export default class CarouselProfile extends Profile {
  static readonly CLASS_NAME = "CarouselProfile";
  static readonly LANGS = {
    en: "CarouselProfile",
    jp: "カルーセル",
  };
  // custom
  static readonly custom = {
    splits: {
      label: "分割数",
      default: 3,
      select: [3, 2, 1],
    },
    splitsSp: {
      label: "分割数" + "-" + Vue.prototype.$words.sp,
      default: 2,
      select: [2, 1],
    },
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    // align: StyleAlign.None,// todo tbd
    // margin: "",
    // padding: "",
    // space: {default: "", select: [...StyleComp.spaceSelect]},
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "children",
    opt: {
      value: [
        {id: "{uid}", fixedModuleId: "Box"},
      ],
      option: {
        splits: 3,
        splitsSp: 2,
      },
    },
    white: ["Box"],
    icon: "layout-three-columns",
  };
}
</script>

<style lang="scss">
</style>
