<template lang="pug">
div
  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "~/molle-cms/src/ui/property/StyleComp.vue";
import {Profile} from "~/molle-cms/src/module/Profile";

@Component({
  components: {StyleComp},
})
export default class HorizonCardProfile extends Profile {
  static readonly CLASS_NAME = "HorizonCardProfile";
  static readonly LANGS = {
    en: "HorizonCard",
    jp: "カード横",
  };

  // custom
  static readonly custom = {};

  //style setting
  static readonly stylePermission = {
    theme: {default: "", select: ["", "-reverse"]},
    color: {default: "", select: ["", "-white"]},
  };
  static settings = {
    type: "group",
    opt: {
      value: {
        title: {id: "{uid}", fixedModuleId: "Headline", order: 0},
        img: {id: "{uid}", fixedModuleId: "Picture", order: 10},
        text: {
          id: "{uid}",
          fixedModuleId: "Box",
          order: 20,
          opt: {
            enabled: ["Paragraph", "ButtonList"],
          },
        },
      },
    },
    convert: ["ProfileCard"],
    icon: "file-richtext",
  };
}
</script>

<style lang="scss">
</style>
