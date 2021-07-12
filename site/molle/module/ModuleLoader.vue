<template lang="pug">
component(
  :is="items[node.id].moduleId",
  :itemData="items[node.id]"
)
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import allData from "~/molle/nuxt-config/firestore-snap.json";
import {IItemData} from "~/molle/interface";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  @Prop({default: () => ({id: 0})}) node!: any;
  items = allData.items;
}
</script>

<style lang="scss">
</style>
