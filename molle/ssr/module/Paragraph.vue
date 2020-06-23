<template lang="pug">
  .module
    p(
      v-html="itemData.value || itemData.superValue"
      :class="getClass()"
    )

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/ssr/module/Module";

  @Component({
    components: {}
  })
  export default class Paragraph extends Module {
    @Prop() itemData?: any;
  }
</script>

<style lang="scss">
  .module {
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
