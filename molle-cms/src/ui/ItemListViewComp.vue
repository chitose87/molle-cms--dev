<template lang="pug">
.item-list-view-comp
  ItemListItemComp(:node="{id:itemId}" :isRoot="true")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {INodeObject} from "../interface";

@Component({
  components: {}
})
export default class ItemListViewComp extends Vue {
  @Prop() itemId!: String;

  created() {
  }

  mounted() {
  }

}
</script>

<style lang="scss">
.item-list-view-comp {
}
</style>
