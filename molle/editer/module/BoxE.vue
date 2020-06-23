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
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import {ItemOptionAddModuleProfile} from "~/molle/editer/module/item-option/AddModule.vue";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {IItemStoreData, ItemProfile} from "~/molle/interface/ItemProfile";
  import {ItemStoreDataMgr} from "~/molle/editer/ItemStoreDataMgr";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class BoxE extends ModuleE {
    static placeholder = {
      moduleId: "Box",
      value: [],
      type: "children",
    };

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

    children: IItemStoreData[] = [];

    created() {
      //モジュールをwatch
      ItemStoreDataMgr.watch(this, this.itemData!.ref!,
        (itemData: IItemStoreData) => {
          this.$set(this, "itemData", itemData);

          //モジュールのvalueの中身をそれぞれwatch
          // this.children.length = 0;
          for (let i in itemData.value) {
            let ref = itemData.value[i];
            // this.children.push(<any>{ref: ref});
            ItemStoreDataMgr.watch(this, ref,
              (_itemData: IItemStoreData) => {
                if (itemData.value.every((ele: any) => ele.id != ref.id)) {
                  //多分　valueから消えたやつなのでunwatch
                  console.log(ref.id);
                  ItemStoreDataMgr.unwatch(this, ref.id);
                  return;
                }
                console.log("set", i, _itemData);
                this.$set(this.children, i, _itemData);
              }
            )
          }
        },
        {
          moduleId: "box",
          type: "children",
        }
      );
    }

    onAddModule(ref: firebase.firestore.DocumentReference) {
      let value;
      console.log(this.itemData!.value,Array.isArray(this.itemData!.value))
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
