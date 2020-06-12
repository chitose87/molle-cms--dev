<template lang="pug">
  .module
    component(
      :is="itemData.option.lv"
      v-html="valueData.value || valueData.superValue"
      :class="getClass()"
    )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/ssr/module/Module";

  @Component({
    components: {}
  })
  export default class Headline extends Module {
    @Prop() itemData?: any;
    @Prop() valueData?: any;
    @Prop() styleData?: any;
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
