<template lang="pug">
  .module-tree-item-comp
    button.btn.btn-sm.btn-outline-secondary(
      @mouseover="focus(true)"
      @mouseleave="focus(false)"
      @click="toggle()"
      :class="{active:getActive()}"
    )
      div
        //span moduleId:
        b(v-html="vueRef.$data.itemData.moduleId")
      //div
        span id:
        b(v-html="vueRef.$props.itemData.id")

    .list-group.mt-3(v-if="tree.length")
      .list-group-item.list-group-item-action.pr-0(v-for="item in tree")
        ModuleTreeItemComp(:vueRef="item")

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
  import {ModuleEContainer} from "~/molle/editer/module/ModuleEContainer";
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import ModuleEditorComp from "~/molle/editer/ui/ModuleEditorComp.vue";

  @Component({
    components: {}
  })
  export default class ModuleTreeItemComp extends Vue {
    @Prop() vueRef?: ModuleE | ModuleEContainer;

    tree: Vue[] = [];
    moduleEditor?: ModuleEditorComp;

    beforeMount() {
      this.update();
    }

    @Watch("vueRef")
    update() {
      let tree = [];
      for (let child of this.vueRef!.$children) {
        if (child instanceof ModuleE) {
          tree.push(child);
        } else if (child instanceof ModuleEditorComp) {
          this.moduleEditor = child;
        }
      }
      this.$set(this, "tree", tree);
    }

    focus(flag: boolean) {
      if (this.moduleEditor) {
        this.moduleEditor.$data.outerFocus = flag;
      }
    }

    toggle() {
      if (this.moduleEditor) {
        this.moduleEditor.$data.isEdit = !this.moduleEditor.$data.isEdit;
      }
    }

    getActive() {
      try {
        return this.moduleEditor!.$data.isEdit;
      } catch (e) {
        return false
      }
    }
  }
</script>

<style lang="scss">
</style>
