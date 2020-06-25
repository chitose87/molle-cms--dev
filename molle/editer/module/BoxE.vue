<template lang="pug">
  .module-e
    ModuleEditorComp(:itemOption="itemOption")
    .box(
      v-if="itemData"
      :class="getClass()"
    )
      component(
        v-for="itemData in children"
        v-if="itemData"
        :key="itemData.ref.id"
        :is="itemData.moduleId +'E'"
        :itemData="itemData"
      )
</template>

<script lang="ts">
  import {Component, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "~/node_modules/firebase";
  import ValueComp from "~/molle/editer/ui/ValueComp.vue";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {IStyleStoreData, StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ItemOptionAddModuleProfile} from "~/molle/editer/module/item-option/AddModule.vue";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {ItemStoreDataMgr} from "~/molle/editer/ItemStoreDataMgr";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {ModuleEContainer} from "~/molle/editer/module/ModuleEContainer";
  import {BoxInitial} from "~/molle/editer/module/index";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class BoxE extends ModuleEContainer {
    itemOption = [
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
    styleData: IStyleStoreData = this.styleProfile.getDefaultData();

    created() {
      FirestoreMgr.addlistener(
        this.itemData!.ref!,
        (itemData: IItemStoreData) => {
          this.$set(this, "itemData", itemData);
          this.watchChildren(this.itemData!.value);
        },
        {
          initial: BoxInitial,
          force: true,
          watcher: this
        }
      );

      // ItemStoreDataMgr.watch(this, this.itemData!.ref!,
      //   (itemData: IItemStoreData) => {
      //     this.$set(this, "itemData", itemData);
      //     this.watchChildren(this.itemData!.value);
      //   },
      //   BoxInitial
      // );
      super._created();
    }

    onAddModule(ref: firebase.firestore.DocumentReference) {
      let value;
      // console.log(this.itemData!.value, Array.isArray(this.itemData!.value))
      if (Array.isArray(this.itemData!.value)) {
        value = [...this.itemData!.value, ref];
      } else {
        value = [ref];
      }
      this.itemData!.ref.update({value: value});
    }
  }
</script>

<style lang="scss">
  .e {
  }

</style>
