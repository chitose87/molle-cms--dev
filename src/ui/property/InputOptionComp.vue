<template lang="pug">
  .item-option-input
    label.form-inline
      span.mr-1 {{label}}:
      input.form-control.form-control-sm(
        type="text"
        :value="data[dataKey]"
        @change="update"
      )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  /**
   */
  export default class SpaceOptionComp extends Vue {
    @Prop() label?: string;
    @Prop() data?: any;
    @Prop() dataKey?: string;
  }
</script>

<style lang="scss">
</style>
