<template lang="pug">
  .value-tree-comp
    p Value Tree
    .list-group
      .list-group-item.list-group-item-action(v-for="item in tree")
        ValueTreeItemComp(:id="item")

</template>

<script lang="ts">
  import {Component, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import ValueTreeItemComp from "~/molle/ui/ValueTreeItemComp.vue";
  import {IValueStoreData} from "~/molle/interface/ValueProfile";

  @Component({
    components: {ValueTreeItemComp}
  })
  export default class ValueTreeComp extends Vue {
    contentStore = contentStore;

    tree: string[] = [];

    mounted() {
      this.contentStoreValues();
    }

    @Watch("contentStore.values")
    contentStoreValues() {
      console.log("--contentStoreValues", contentStore.values);
      if (contentStore.values) {
        let tree = [];
        for (let id in contentStore.values) {
          let item: IValueStoreData = contentStore.values[id];
          if (!item.extendsId) {
            tree.push(id);
          }
        }
        this.$set(this, "tree", tree);
        console.log(tree);
      }
    }
  }
</script>

<style lang="scss">
  .value-tree-comp {
    position: fixed;
    top: 0;
    right: 0;

    z-index:$zindex-fixed;
  }
</style>
