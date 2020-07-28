<template lang="pug">
  .module
    component(
      :is="itemDataProp.option.lv"
      v-html="itemDataProp.value || itemDataProp.superValue"
      :class="getClass(itemDataProp)"
    )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/ssr/module/Module";

  @Component({
    components: {}
  })
  export default class Headline extends Module {
  }
</script>

<style lang="scss">
  .module {
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
