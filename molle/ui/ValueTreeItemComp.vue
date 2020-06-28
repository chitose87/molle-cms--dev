<template lang="pug">
  .value-tree-item-comp
    button.btn.btn-sm.btn-outline-secondary
      span id:
      b(v-html="itemData.ref.id")
      div(v-if="itemData.name")
        span name:
        b(v-html="itemData.name")
      //div
        span type:
        b(v-html="itemData.type")
      div
        span value:
        span(v-if="itemData.type=='text'" v-html="itemData.value")
        span(v-if="itemData.type=='children'" v-html="itemData.value.length")

    .list-group.mt-3(v-if="itemData.follower")
      .list-group-item.list-group-item-action.pr-0(v-for="item in itemData.follower")
        ValueTreeItemComp(:itemData="item")

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";

  @Component({
    components: {}
  })
  export default class ValueTreeItemComp extends Vue {
    contentStore = contentStore;

    @Prop() itemData?: IItemStoreData;

    mounted() {
      // this.updateValue();
    }

    // @Watch("contentStore.values")
    // updateValue() {
    //   this.value = contentStore.values[this.id!]
    // }
  }
</script>

<style lang="scss">
  .value-tree-item-comp {
  }
</style>
