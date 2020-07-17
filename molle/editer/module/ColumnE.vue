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

        .column__item.w-100.text-center.pt-0(v-if="editing")
          button.btn.btn-sm.btn-primary(@click="onAddItem()")
            span カラム追加

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {InitialValue} from "~/molle/editer/module/index";
  import * as firebase from "~/node_modules/firebase";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
  import {ModuleEContainer} from "~/molle/editer/module/ModuleEContainer";
  import {ItemOptionInputProfile} from "~/molle/editer/module/item-option/Input.vue";

  @Component({
    components: {ModuleEditorComp, StyleComp}
  })
  export default class ColumnE extends ModuleEContainer {
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
    onAddItem() {
      console.log("onAddItem")
      firebase.firestore().collection(`items`)
        .add(InitialValue.Box)
        .then((ref) => {
          let value;
          if (Array.isArray(this.itemData!.value)) {
            value = [...this.itemData!.value, ref.id];
          } else {
            value = [ref.id];
          }
          // console.log(value)
          FirestoreMgr.itemUpdate(this.itemId!, {value: value});
        });
    }
  }
</script>

<style lang="scss">
</style>
