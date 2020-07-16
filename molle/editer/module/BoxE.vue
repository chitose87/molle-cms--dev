<template lang="pug">
  .module-e(v-if="itemData.moduleId")
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
      AddModule(v-if="editing" :added="onAddModule")

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
  import AddModule from "~/molle/editer/ui/AddModule.vue";

  @Component({
    components: {AddModule, ModuleEditorComp, StyleComp}
  })
  export default class BoxE extends ModuleEContainer {
    itemOption = [
      // new ItemOptionAddModuleProfile({
      //   added: this.onAddModule
      // })
      // todo:containerクラス
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
      // console.log("created", this.itemId!.id);
      this.init(InitialValue.Box);
    }

    onAddModule(ref: firebase.firestore.DocumentReference) {
      let value;
      // console.log(this.itemData!.value, Array.isArray(this.itemData!.value))
      // console.log("----------------")
      // console.log(Array.isArray(this.itemData!.value))
      // console.log(this.itemData!.id, id)
      if (Array.isArray(this.itemData!.value)) {
        value = [...this.itemData!.value, ref.id];
      } else {
        value = [ref.id];
      }
      // console.log(value)
      FirestoreMgr.itemUpdate(this.itemId!, {value: value});
    }
  }
</script>

<style lang="scss">
  .e {
  }

</style>
