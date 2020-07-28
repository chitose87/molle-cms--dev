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
      flex-wrap: wrap;
      //margin: -$grid-gutter-width;

      &__item {
        flex-grow: 0;
        flex-shrink: 1;
        //padding: $grid-gutter-width;
      }
    }

    .test {
      width: 50%;
      margin: auto;
    }

    .dark {
      background-color: $color-black;
      color: $color-white;
    }
  }
</style>
