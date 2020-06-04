<template lang="pug">
  .value-tree-comp
    p Value Tree
    .list-group
      .list-group-item.list-group-item-action(v-for="item in tree")
        ValueTreeItemComp(:id="item")
    //.list-group-flush
      button.list-group-item.list-group-item-action


</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {IValue, IValueType, ValueTypes} from "~/molle/interface/Value";
  import ValueTreeItemComp from "~/components/ValueTreeItemComp.vue";

  @Component({
    components: {ValueTreeItemComp}
  })
  export default class ValueTreeComp extends Vue {
    contentStore = contentStore;
    valueTypes = ValueTypes;

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
          let item: IValue = contentStore.values[id];
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
  }
</style>
