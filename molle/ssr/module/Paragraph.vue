<template lang="pug">
  .module
    p(
      v-html="itemDataProp.value || itemDataProp.superValue"
      :class="getClass(itemDataProp)"
    )

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/ssr/module/Module";

  @Component({
    components: {}
  })
  export default class Paragraph extends Module {
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
