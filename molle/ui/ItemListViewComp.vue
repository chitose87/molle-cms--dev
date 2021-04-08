<template lang="pug">
.item-list-view-comp
  .card.bg-light

    .card-header.pt-1.pb-1.pl-3.pr-3.text-right 構造/Structure

    .list-group
      .item-list-item-comp.list-group-item.list-group-item-action.p-0.border-right-0
        button.btn.btn-sm.btn-link.btn-block.text-left(
          :class="{active: !lsStore.storage.focusModuleNode.id}",
          @click="lsStore.update({key: 'focusModuleNode', value: {id:0}})"
          @mouseover="lsStore.update({key: 'hoverModuleNode', value: {id:0}})"
        )
          b-icon.ml-n1.mr-1(icon="window")
          b Page
      ItemListItemComp(:node="{id:itemId}" :isRoot="true")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import {INodeObject} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";

@Component({
  components: {}
})
export default class ItemListViewComp extends Vue {
  @Prop() itemId!: String;
  lsStore = lsStore;

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
