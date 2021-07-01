<template lang="pug">
component(
  :is="itemData.moduleId",
  :itemData="itemData"
)
</template>

<script lang="ts">
import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import {IItemData, INodeObject} from "~/molle/interface";
import allData from "~/molle/nuxt-config/firestore-snap.json";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  @Prop({default: () => ({id: 0})}) node!: INodeObject;

  itemData = <IItemData>{moduleId: "div"};

  beforeMount() {
    this.itemData = allData.items[this.node.id];
  }
}
</script>

<style lang="scss">
</style>
