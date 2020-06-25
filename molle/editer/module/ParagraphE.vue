<template lang="pug">
  .module-e
    Paragraph(
      :itemData="itemData"
    )

    ModuleEditorComp

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import ValueComp from "~/molle/editer/ui/ValueComp.vue";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {IStyleStoreData, StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class ParagraphE extends ModuleE {
    static placeholder = {
      moduleId: "Paragraph",
      value: "Lorem ipsum...",
      type: "text",
    };

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

    // destroyed() {
    //   this._destroyed();
    // }

    //Unique Methods
  }
</script>

<style lang="scss">
</style>
