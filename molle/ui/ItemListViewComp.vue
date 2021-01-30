<template lang="pug">
  .item-list-view-comp
    .card.bg-light

      .card-header.pt-1.pb-1.pl-3.pr-3.text-right 構造/Structure

      //page item

      .list-group
        ItemListItemComp(:itemId="itemId")

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class ItemListViewComp extends Vue {
    @Prop() itemId!: string;

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
