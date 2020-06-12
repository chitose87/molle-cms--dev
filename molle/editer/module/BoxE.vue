<template lang="pug">
  .e
    .box(
      :class="getClass()"
    )
      component(
        v-for="id in valueData.value"
        :key="id"
        :is="contentStore.outlines[contentStore.items[id].moduleId].name + 'E'"
        :itemData="contentStore.items[id]"
      )
    AddModuleComp(@added="onAddModule")


    //.editer(:status="isEdit?'show':'hidden'")
      button.toggle(@click="isEdit=!isEdit") 閉じる
      div(v-if="isEdit")
        ValueComp(:valueData="valueData" :valueProfile="valueProfile")
        StyleComp(:styleData="styleData" :styleProfile="styleProfile")

        button.btn.btn-danger(@click="deleteModule()") 削除
</template>

<script lang="ts">
  import {Component, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "~/node_modules/firebase";
  import ValueComp from "~/components/ValueComp.vue";
  import StyleComp from "~/components/StyleComp.vue";
  import {StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import AddModuleComp from "~/components/AddModuleComp.vue";
  import {ModuleE} from "~/molle/editer/module/ModuleE";

  @Component({
    components: {AddModuleComp, StyleComp, ValueComp}
  })
  export default class BoxE extends ModuleE {
    //value setting
    static valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.children]
    });

    //style setting
    static styleProfile: StyleProfile = new StyleProfile({
      border: false,
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    });

    constructor(...args: any[]) {
      super(args);
      this.valueProfile = BoxE.valueProfile;
      this.styleProfile = BoxE.styleProfile;
      this.styleData = this.styleProfile.getDefaultData();
    }

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

    beforeMount() {
    }

    update() {
      // let updateData: IItemStoreData = <IItemStoreData>{};
      // updateData.option = this.itemData!.option;
      //
      // this.itemData!.ref!.update(updateData);
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

  .editer-h {
    position: absolute;

    &[status=hidden] {
      z-index: $zindex-fixed - 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .toggle {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;

        &:hover {
          opacity: 0.1;
        }
      }
    }

    &[status=show] {
      z-index: $zindex-fixed;
      border: 1px solid gray;
      padding: 1rem;
      background-color: lightblue;
    }
  }
</style>
