<template lang="pug">
  .module-tree-comp
    button(@click="toggle=!toggle") 構造／Structure
    b-sidebar(v-model="toggle" title="構造／Structure")
      .list-group(v-if="toggle")
        .list-group-item.list-group-item-action(v-for="item in getTree()")
          ModuleTreeItemComp(:vueRef="item")

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
  import ModuleTreeItemComp from "~/molle/ui/ModuleTreeItemComp.vue";

  @Component({
    components: {ModuleTreeItemComp}
  })
  export default class ModuleTreeComp extends Vue {
    toggle: boolean = false;

    mounted() {
    }

    getTree() {
      let tree = [];
      for (let child of this.$parent.$children) {
        if (child.$data && child.$data.itemData) {
          tree.push(child);
        }
      }
      return tree;
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
