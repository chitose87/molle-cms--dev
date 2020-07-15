<template lang="pug">
  .column__item(
    v-if="itemData.moduleId"
    :style="getStyle()"
  )
    .module-e
      ModuleEditorComp(
        :itemOption="itemOption"
        :itemData="itemData"
        :valueProfile="valueProfile"
        :styleProfile="styleProfile")

      .box(
        :class="getClass(itemData)"
      )
        component(
          v-for="child in children"
          v-if="child"
          :key="child.id"
          :is="child.moduleId +'E'"
          :itemId="child.id"
        )
</template>

<script lang="ts">
  import {Component, Prop, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "~/node_modules/firebase";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {ModuleEContainer} from "~/molle/editer/module/ModuleEContainer";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
  import {InitialValue} from "~/molle/editer/module/index";
  import {ItemOptionInputProfile} from "~/molle/editer/module/item-option/Input.vue";
  import {ItemOptionAddModuleProfile} from "~/molle/editer/module/item-option/AddModule.vue";

  @Component({
    components: {ModuleEditorComp, StyleComp}
  })
  export default class ColumnBoxE extends ModuleEContainer {
    itemOption = [
      new ItemOptionInputProfile({
        id: "flex-basis",
        label: "カラムサイズ"
      }),
      new ItemOptionAddModuleProfile({
        added: this.onAddModule
      })
    ];
    //value setting
    valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.children]
    });

    //style setting
    styleProfile: StyleProfile = new StyleProfile({
      border: false,
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    });

    created() {
      this.init(InitialValue.Box);
    }

    onAddModule(ref: firebase.firestore.DocumentReference) {
      let value;
      if (Array.isArray(this.itemData!.value)) {
        value = [...this.itemData!.value, ref.id];
      } else {
        value = [ref.id];
      }
      FirestoreMgr.itemUpdate(this.itemId!, {value: value});
    }

    getStyle() {
      let obj: any = {};
      let selfOpt = this.itemData.option || {};
      let parentOpt;
      try {
        parentOpt = this.$parent.$data.itemData.option;
      } catch (e) {
        parentOpt = {};
      }

      let attrs = ["flex-basis"];
      for (let attr of attrs) {
        obj[attr] = selfOpt[attr] || parentOpt[attr];
      }
      return obj;
    }
  }
</script>

<style lang="scss">
  .column__item {
    .module-editor__swap-btn {
      transform: rotate(90deg);
    }
  }

</style>
