<template lang="pug">
div
  label.form-inline
    span.mr-1 {{custom.module.label}}:
    select.form-control.form-control-sm(
      v-model="itemData.option.module"
      @change="()=>$emit('change')"
    )
      option(v-for="item in $molleModuleList" :value="item.ref.CLASS_NAME" v-html="item.ref.CLASS_NAME")

  TextAreaQuill(
    :label="custom.description.label+':'"
    v-model="itemData.option.description"
    @change="()=>$emit('change')"
  )

  TextAreaQuill(
    :label="custom.memo.label+':'"
    v-model="itemData.option.memo"
    @change="()=>$emit('change')"
  )

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";
import DevModuleGuide from "./DevModuleGuide.vue";
import TextAreaQuill from "~/molle-cms/src/ui/property/TextAreaQuill.vue";

@Component({
  components: {TextAreaQuill, StyleComp},
})
export default class DevModuleGuideProfile extends Profile {
  static readonly CLASS_NAME = "DevModuleGuideProfile";
  static readonly LANGS = {
    en: DevModuleGuide.CLASS_NAME,
    jp: "モジュールガイド",
  };
  // custom
  static readonly custom = {
    module: {
      label: Vue.prototype.$words.module,
      value: Vue.prototype.$words.module + "を選択"
    },
    description: {label: Vue.prototype.$words.description, value: Vue.prototype.$words.text},
    memo: {label: Vue.prototype.$words.memo, value: Vue.prototype.$words.text},
  };
  //style setting
  static readonly stylePermission = {
    margin: "",
    padding: "",
  };

  static settings = {
    type: "children",
    black: [DevModuleGuide],
    icon: "plus-square",
    opt: {
      option: {
        module: "Box",
        description: "description",
        memo: "memo",
      },
    },
  };
}
</script>

<style lang="scss">
</style>
