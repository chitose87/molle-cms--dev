<template lang="pug">
.item-list-view-comp
  .card.bg-light

    .card-header.pt-1.pb-1.pl-3.pr-3.text-right 構造/Structure

    .list-group
      .item-list-item-comp.list-group-item.list-group-item-action.p-0.border-right-0
        button.btn.btn-sm.btn-link.btn-block.text-left(
          :class="{active: !this.$route.query.focus}",
          @click="$router.push({query: {...$route.query, focus: 0}})"
          @mouseover="$router.push({query: {...$route.query, focus: 0}})"
        )
          b-icon.ml-n1.mr-1(icon="window")
          b Page
      ItemListItemComp(:node="{id:itemId}" :isRoot="true")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {INodeObject} from "~/molle-cms/src/interface";

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
