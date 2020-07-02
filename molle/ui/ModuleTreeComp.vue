<template lang="pug">
  .module-tree-comp
    p Module Tree
    button(@click="refresh()") 構造／Structure
    b-sidebar(v-model="toggle" title="構造／Structure")
      .list-group
        .list-group-item.list-group-item-action(v-for="item in tree")
          ModuleTreeItemComp(:vueRef="item")

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
  import ModuleTreeItemComp from "~/molle/ui/ModuleTreeItemComp.vue";

  @Component({
    components: {ModuleTreeItemComp}
  })
  export default class ModuleTreeComp extends Vue {
    tree: Vue[] = [];
    toggle: boolean = false;

    mounted() {
    }

    refresh() {
      this.toggle = !this.toggle;

      let tree = [];
      if (this.toggle) {
        for (let child of this.$parent.$children) {
          if (child.$props && child.$props.itemData) {
            tree.push(child);
          }
        }
      }
      this.$set(this, "tree", tree);
    }
  }
</script>

<style lang="scss">
  .module-tree-comp {
    position: fixed;
    top: 0;
    left: 0;

    z-index: $zindex-fixed;
  }
</style>
