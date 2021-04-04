<template lang="pug">
  footer.global-footer
    small Copyright © All Rights Reserved.
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class GlobalFooterComp extends Vue {
    static MOLLE_DELETE_WITH_STATIC_MODE = true;
  }
</script>

<style lang="scss">
  .global-footer {
    height: 55px;
    text-align: center;
    background: $color-gray-700;

    small {
      color: $color-white;
      font-size: 16px;
      display: block;
      line-height: 55px;
      font-weight: bold;
      @include mediaquery-not-sm{
        margin-right: 44px;
      }
    }
  }
</style>
