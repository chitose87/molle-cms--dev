<template lang="pug">
  .item-list-view-comp.bootstrap
    .list-group
      p {{itemId}}
      ItemListItemComp(:itemId="itemId")

    style.
      [data-item-id="{{lsStore.storage.focusModuleId}}"]{
        outline:1px solid red;
      }

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import { lsStore } from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class ItemListViewComp extends Vue {
    @Prop() itemId!: string;
    lsStore=lsStore;

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
  }
</style>
