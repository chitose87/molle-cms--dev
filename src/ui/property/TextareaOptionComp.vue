<template lang="pug">
  .textarea-option
    label.form-inline
      span.mr-1 {{label}}:
      textarea.form-control.form-control-sm(
        v-model="localValue"
        @change="()=>$emit('change')"
      )

</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {OptionComp} from "~/src/ui/property/OptionComp.ts";

  @Component({
    components: {}
  })
  /**
   */
  export default class TextareaOptionComp extends OptionComp {
  }
</script>

<style lang="scss">
</style>
