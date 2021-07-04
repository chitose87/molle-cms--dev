<template lang="pug">
component(
  :is="itemData.moduleId",
  :itemData="itemData"
)
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import allData from "~/molle/nuxt-config/firestore-snap.json";

@Component({
  components: {},
})
export default class ModuleLoader extends Vue {
  @Prop({default: () => ({id: 0})}) node!: any;

  itemData = {moduleId: "div"};

  beforeMount() {
    //@ts-ignore
    this.itemData = allData.items[this.node.id];
  }
}
</script>

<style lang="scss">
</style>
