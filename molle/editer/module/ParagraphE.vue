<template lang="pug">
  .module-e(v-if="itemData.moduleId")
    p(
      v-html="(reactiveValue || itemData.value || itemData.superValue || 'empty').replace(/\\n/g, '<br>')"
      :class="getClass(itemData)"
      ref="reactiveTarget"
      style="visibility: hidden;"
    )

    textarea.reactive(
      :value="reactiveValue || ''"
      :style="reactiveStyle"
      @input="reactiveFunc($event)"
      placeholder="input Paragraph Text"
    )

    ModuleEditorComp(
      :itemData="itemData"
      :valueProfile="valueProfile"
      :styleProfile="styleProfile"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import ValueComp from "~/molle/editer/ui/ValueComp.vue";
  import StyleComp from "~/molle/editer/ui/StyleComp.vue";
  import {StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";
  import {InitialValue} from "~/molle/editer/module/index";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class ParagraphE extends ModuleE {
    //value setting
    valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.text]
    });

    //style setting
    styleProfile: StyleProfile = new StyleProfile({
      border: false,
      align: StyleAlign.None,
      theme: {default: "", select: ["", "test"]},
      color: {default: "", select: ["", "dark"]},
    });

    //reactive
    reactiveTarget?: HTMLElement;
    reactiveValue = "";
    reactiveStyle: any = {};
    private reactiveSaveTimeId: number = 0;

    created() {
      this.init(InitialValue.Paragraph, () => {
        this.$set(this, "reactiveValue", this.itemData.value);

        let target: any = this.$refs.reactiveTarget;
        if (!target) return;
        this.reactiveTarget = target.$el || target;

        let v: CSSStyleDeclaration = getComputedStyle(this.reactiveTarget!, null);
        for (let i = 0; i < v.length; i++) {
          let name = v.item(i);
          switch (name) {
            case "visibility":
            case "overflow":
            case "position":
            case "top":
              break;
            default:
              this.reactiveStyle[name] = v.getPropertyValue(name);
          }
        }
        this.reactiveStyle.overflow = "hidden";
        this.reactiveStyle.position = "absolute";
        this.reactiveStyle.top = "0";

        this.setSize();
      });
    }

    reactiveFunc($event: any) {
      this.reactiveValue = $event.target.value || "";
      requestAnimationFrame(() => this.setSize());

      clearTimeout(this.reactiveSaveTimeId);
      //@ts-ignore
      this.reactiveSaveTimeId = setTimeout(() => {
        FirestoreMgr.itemUpdate(this.itemRef!, {value: this.reactiveValue});
      }, 1000);
    }

    private setSize() {
      let nv = this.reactiveTarget!.clientHeight + "px";
      if (this.reactiveStyle.height != nv) {
        let obj = Object.assign({}, this.reactiveStyle);
        obj.height = nv;
        this.$set(this, "reactiveStyle", obj);
      }
    }

    //Unique Methods
  }
</script>

<style lang="scss">
  .module-e {
  }

</style>
