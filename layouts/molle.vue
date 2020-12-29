<template lang="pug">
  div
    Nuxt
</template>

<style lang="scss">
  .bootstrap {
    @import '~bootstrap/scss/bootstrap';
    @import '~bootstrap-vue/src/index.scss';

    @each $color, $value in $colors {
      @include bg-variant(".bg-#{$color}", $value, true);
    }
  }
</style>
<script lang="ts">
</script>

<style lang="scss">
</style>
