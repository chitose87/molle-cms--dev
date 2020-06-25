<template lang="pug">
  .module-e
    Headline(
      :itemData="itemData"
    )

    ModuleEditorComp(:itemOption="itemOption")

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import ValueComp from "~/molle/editer/ui/ValueComp.vue";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {ItemOptionSelectProfile} from "~/molle/editer/module/item-option/Select.vue";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class HeadlineE extends ModuleE {
    itemOption = [
      new ItemOptionSelectProfile({
        id: "lv",
        label: "見出しレベル",
        // default: "h3",
        select: ["h1", "h2", "h3", "h4", "h5", "h6"]
      })
    ];

    //value setting
    valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.text]
    });

    //style setting
    styleProfile: StyleProfile = new StyleProfile({
      border: false,
      align: StyleAlign.None,
      theme: {default: "", select: ["", "test"]},
      color: {default: "", select: ["", "dark"]},
    });

    created() {
      this._created();
    }

    //Unique Methods
  }
</script>

<style lang="scss">
</style>
