<template lang="pug">
  .input-option
    label.form-inline
      span.mr-1 {{label}}:
      input.form-control.form-control-sm(
        v-model="localValue"
        @change="()=>$emit('change')"
      )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {OptionComp} from "~/src/ui/property/OptionComp";

  @Component({
    components: {}
  })
  /**
   */
  export default class InputOptionComp extends OptionComp {
  }
</script>

<style lang="scss">
</style>
