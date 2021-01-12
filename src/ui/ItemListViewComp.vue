<template lang="pug">
  .item-list-view-comp.bootstrap.shadow(:aria-expanded="expanded")
    .card.bg-light
      button.btn.btn-outline-secondary.item-list-view-comp__toggle(
        @click="()=>expanded=!expanded"
      )
        b-icon(icon="layout-sidebar-inset")

      .card-header.pt-1.pb-1.pl-3.pr-3.text-right 構造/Structure
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
    expanded = true;

    created() {
    }

    mounted() {
    }

  }
</script>

<style lang="scss">
  .item-list-view-comp {
    background-color: $color-gray-100;
    height: 100vh;
    overflow: auto;

    position: sticky;
    top: 0;

    width: 0;
    &[aria-expanded=true] {
      min-width: 300px;
      max-width: 300px;
    }

    &__toggle {
      position: fixed;
      top: 0rem;
      left: 0rem;
    }

  }
</style>
