<template lang="pug">
component(
  :is="items[node.id].moduleId",
  :itemData="items[node.id]"
  v-if="check()"
)
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import allData from "~/molle/nuxt-config/firestore-snap.json";
import {IItemData} from "~/molle-cms/src/interface";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  @Prop({default: () => ({id: 0})}) node!: any;
  items = allData.items;

  check() {
    //@ts-ignore
    let itemData: any = this.items[this.node.id];
    if (!itemData || itemData.noExport) {
      console.log(this.node.id);
      return false;
    }
    switch (itemData.type) {
      case "children":
        return itemData.value.length;
        break;
      default:
        return itemData.value;
    }
  }
}
</script>

<style lang="scss">
</style>
