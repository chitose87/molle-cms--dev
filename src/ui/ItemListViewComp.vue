<template lang="pug">
  .item-list-view-comp.bootstrap
    p 構造
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
  .item-list-view-comp.bootstrap {
    background-color: $color-gray-100;
    min-width: 300px;
    height: 100vh;
    overflow: auto;

    position: sticky;
    top: 0;
    box-shadow:$shadow-depth--1;
  }
</style>
