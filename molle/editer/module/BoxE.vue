<template lang="pug">
  .e
    .box(
      :class="getClass()"
    )
      component(
        v-for="id in valueData.value"
        :key="id"
        :is="getName(id) + 'E'"
        :itemData="contentStore.items[id]"
      )
    ModuleEditorComp(:itemOption="itemOption")
</template>

<script lang="ts">
  import {Component, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "~/node_modules/firebase";
  import ValueComp from "~/molle/editer/ui/ValueComp.vue";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {IStyleStoreData, StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import {ItemOptionAddModuleProfile} from "~/molle/editer/module/item-option/AddModule.vue";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class BoxE extends ModuleE {
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
      this._created();
    }

    mounted() {
      this.changeContentStoreValues();
    }

    destroyed() {
      this._destroyed();
    }

    //Unique Methods

    getName(id: string) {
      let moduleId = this.contentStore.items[id].moduleId;
      // console.log(id,moduleId,this.contentStore.outlines[moduleId])
      return this.contentStore.outlines[moduleId].name;
    }

    @Watch("valueData")
    changeValueData() {
      let value: string[] = this.valueData.value;

      //validation
      if (!Array.isArray(this.valueData.value)) value = [];
      else {
        value = value.filter((id) => !!this.contentStore.items[id]);
      }

      if (!this.valueData.value || this.valueData.value.length != value.length) {
        this.valueData.value = value;
      }
    }

    onAddModule(ref: firebase.firestore.DocumentReference) {
      let update = {
        value: [...this.valueData.value, ref.id]
      };
      this.valueData!.ref!.update(update);
    }

  }
</script>

<style lang="scss">
  .e {
  }

</style>
