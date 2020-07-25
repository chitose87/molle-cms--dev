<template lang="pug">
  .module-e(
    v-if="itemData.moduleId"
    :class="{editing:isEditing()}"
  )
    ModuleEditorComp(
      :itemData="itemData"
      :valueProfile="valueProfile"
      :styleProfile="styleProfile")

    picture(
    )
      source(v-if="getValue('sp')" media="(max-width: 767px)" :srcset="getValue('sp')" :alt="getValue('alt')")
      img(
        :src="getValue('src')" :alt="getValue('alt')"
        :class="getClass(itemData)"
        @load="loaded()"
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

  @Component({
    components: {ModuleEditorComp, StyleComp}
  })
  export default class PictureE extends ModuleE {

    //value setting
    valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.picture]
    });

    //style setting
    styleProfile: StyleProfile = new StyleProfile({
      // border: false,
      // align: StyleAlign.None,
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    });

    created() {
      this.init(InitialValue.Picture);
    }

    //Unique Methods
    getValue(key: string) {
      return (this.itemData.value || {})[key]
        || (this.itemData.superValue || {})[key];
    }

    loaded() {
      this.sizeCheck(this.getValue("src"));
    }

    private sizeCheck(value?: string) {
      try {

      } catch (e) {

      }
    }
  }
</script>

<style lang="scss">
</style>
