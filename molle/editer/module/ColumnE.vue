<template lang="pug">
  .module-e(
    v-if="itemData.moduleId"
    :class="{editing:isEditing()}"
  )
    ModuleEditorComp(
      :itemOption="itemOption"
      :itemData="itemData"
      :valueProfile="valueProfile"
      :styleProfile="styleProfile")

    .module
      .column
        ColumnBoxE(
          v-for="child in children"
          v-if="child"
          :itemId="child.id"
        )

        .column__item.w-100.text-center.pt-0(v-if="isEditing()")
          button.btn.btn-sm.btn-primary(@click="addChild(InitialValue.Box)")
            span カラム追加

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {InitialValue} from "~/molle/editer/module/index";
  import {ModuleEContainer} from "~/molle/editer/module/ModuleEContainer";
  import {ItemOptionInputProfile} from "~/molle/editer/module/item-option/Input.vue";

  @Component({
    components: {ModuleEditorComp, StyleComp}
  })
  export default class ColumnE extends ModuleEContainer {
    InitialValue = InitialValue;

    itemOption = [
      new ItemOptionInputProfile({
        id: "flex-basis",
        label: "基本カラムサイズ(CSS)"
      })
    ];
    //value setting
    valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.children]
    });

    //style setting
    styleProfile: StyleProfile = new StyleProfile({
      // border: false,
      // align: StyleAlign.None,
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    });

    created() {
      this.init(InitialValue.Column);
    }

    //Unique Methods
  }
</script>

<style lang="scss">
</style>
