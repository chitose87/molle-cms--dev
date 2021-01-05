<template lang="pug">
  .item-option-select
    label.form-inline
      span.mr-1 {{label}}:
      select.form-control.form-control-sm(
        v-model="localValue"
        @change="()=>$emit('change')"
        )
        option(v-for="item in select" :value="item" v-html="item")

</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import { OptionComp } from "./OptionComp";

  @Component({
    components: {}
  })
  /**
   */
  export default class SelectOptionComp extends OptionComp {
    @Prop() select?: string[];
  }
</script>

<style lang="scss">
</style>
