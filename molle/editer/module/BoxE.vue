<template lang="pug">
  .module-e(v-if="itemData.value")
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
        :key="child.ref.id"
        :is="child.moduleId +'E'"
        :itemRef="child.ref"
      )
      //div(
      //  v-for="child in children"
      //)
      //  p {{child.moduleId +'E'}}
      //  p {{child.ref.id}}
</template>

<script lang="ts">
  import {Component, Prop, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "~/node_modules/firebase";
  import ValueComp from "~/molle/editer/ui/ValueComp.vue";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ItemOptionAddModuleProfile} from "~/molle/editer/module/item-option/AddModule.vue";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {ModuleEContainer} from "~/molle/editer/module/ModuleEContainer";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
  import {InitialValue} from "~/molle/editer/module/index";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class BoxE extends ModuleEContainer {
    itemOption = [
      new ItemOptionAddModuleProfile({
        added: this.onAddModule
      })
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
      // console.log("created", this.itemRef!.id);
      this.init(InitialValue.Box, () => {
        console.log("BoxE itemData update", this.itemData!.value)

        this.children.length = 0;
        for (let i in this.itemData!.value) {
          let childRef = this.itemData!.value[i];
          FirestoreMgr.addlistener(
            childRef,
            (itemData: IItemStoreData) => {
              console.log("itemData.moduleId", itemData.moduleId)
              this.$set(this.children, i, {
                ref: itemData.ref,
                moduleId: itemData.moduleId
              });
            }, {force: true, once: true}
          )
        }
      });

      // FirestoreMgr.addlistener(
      //   this.itemData!.ref!,
      //   (itemData: IItemStoreData) => {
      //     this.$set(this, "itemData", itemData);
      // console.log("*********", this.itemData!.value)


      // this.watchChildren(this.itemData!.value);


      //   },
      //   {
      //     initial: InitialValue.Box,
      //     force: true,
      //     watcher: this
      //   }
      // );
      //super._created();
    }

    // @Watch("itemData.value")
    // updateItemDataValue(newer: firebase.firestore.DocumentReference[], older: firebase.firestore.DocumentReference[]) {
    // console.log(newer, older)
    // if (newer && older &&
    //   newer.length == older.length &&
    //   newer.every((v, i) => v.id == older[i].id)) {
    //   return;
    // }
    // newer.forEach((v, i) => {
    //   console.log(v.id == older[i].id)
    // })
    // this.watchChildren(this.itemData!.value);
    // }

    destroyed() {
      FirestoreMgr.removelistenerByWatcher(this);
    }

    onAddModule(ref: firebase.firestore.DocumentReference) {
      let value;
      // console.log(this.itemData!.value, Array.isArray(this.itemData!.value))
      // console.log("----------------")
      // console.log(Array.isArray(this.itemData!.value))
      // console.log(this.itemData!.ref.id, ref.id)
      if (Array.isArray(this.itemData!.value)) {
        value = [...this.itemData!.value, ref];
      } else {
        value = [ref];
      }
      // console.log(value)
      FirestoreMgr.itemUpdate(this.itemRef!, {value: value});
    }
  }
</script>

<style lang="scss">
  .e {
  }

</style>
