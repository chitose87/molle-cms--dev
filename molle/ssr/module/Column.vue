<template lang="pug">
  .module
    .column
      .column__item(
        v-for="id in itemDataProp.value"
        :style="{flex:'0 1 30%'}"
      )
        Box(
          :itemDataProp="payload.items[id]"
          :payload="payload"
        )

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/ssr/module/Module";

  @Component({
    components: {}
  })
  export default class Column extends Module {
    // @Prop() itemData?: any;
  }
</script>

<style lang="scss">
  .module {
    .column {
      display: flex;
      margin: -$grid-gutter-width;

      &__item {
        padding: $grid-gutter-width;
      }
    }

    .test {
      width: 50%;
      margin: auto;
    }

    .dark {
      background-color: $black;
      color: $white;
    }
  }
</style>
