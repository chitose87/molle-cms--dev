<template lang="pug">
  .value-tree-comp
    p Value Tree
    .list-group
      .list-group-item.list-group-item-action(v-for="item in tree")
        ValueTreeItemComp(:itemData="item")

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
  import ValueTreeItemComp from "~/molle/ui/ValueTreeItemComp.vue";
  import {Singleton} from "~/molle/Singleton";
  import {IPageStoreData} from "~/molle/interface/IPageStoreData";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";

  @Component({
    components: {ValueTreeItemComp}
  })
  export default class ValueTreeComp extends Vue {
    @Prop() pageData?: IPageStoreData;

    tree: string[] = [];

    mounted() {
      Singleton.onChange.push(() => {
        this.refresh();
      });
    }

    refresh() {
      console.log("refresh");
      let tree = [];
      for (let id in Singleton.store.items) {
        let item: IItemStoreData = Singleton.store.items[id];
        if (!item.extends) {
          tree.push(item);
        } else {
          let via = Singleton.store.items[item.extends];
          if (!via.follower) via.follower = {};
          via.follower[item.id] = item;
        }
      }
      this.$set(this, "tree", tree);
      console.log(tree);
    }
  }
</script>

<style lang="scss">
  @import '~/assets/scss/bootstrap-var.scss';
  .value-tree-comp {
    position: fixed;
    top: 0;
    right: 0;

    z-index: $zindex-fixed;
  }
</style>
