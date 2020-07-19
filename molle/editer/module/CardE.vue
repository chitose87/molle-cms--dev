<template lang="pug">
  .module-e(
    v-if="itemData.moduleId"
    :class="{editing:isEditing()}"
  )
    ModuleEditorComp(
      :itemData="itemData"
      :valueProfile="valueProfile"
      :styleProfile="styleProfile")
    .card(
      :class="getClass(itemData)"
    )

      HeadlineE(
        v-if="itemData.value.Headline"
        :itemId="itemData.value.Headline"
      )

      ParagraphE(
        v-if="itemData.value.Paragraph"
        :itemId="itemData.value.Paragraph"
      )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {InitialValue} from "~/molle/editer/module/index";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

  @Component({
    components: {ModuleEditorComp, StyleComp}
  })
  export default class CardE extends ModuleE {
    //value setting
    valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.children]
    });

    //style setting
    styleProfile: StyleProfile = new StyleProfile({
      border: false,
      align: StyleAlign.None,
      theme: {default: "", select: ["", "test"]},
      color: {default: "", select: ["", "dark"]},
    });

    created() {
      this.init(InitialValue.Card, () => {
        let v: any = {};

        let flag: boolean = false;
        for (let iv of [InitialValue.Headline, InitialValue.Paragraph]) {
          if (!this.itemData.value[iv.moduleId]) {
            v[iv.moduleId] = FirestoreMgr.itemsRef.doc().id;
            flag = true;
          }
        }
        if (flag) {
          FirestoreMgr.itemsRef.doc(this.itemId).update({value: v});
        }
      });
    }

    //Unique Methods
  }
</script>

<style lang="scss">
  .card {
    box-shadow: $box-shadow;
  }
</style>
