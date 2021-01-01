<template lang="pug">
  .textarea-option-input
    label.form-inline
      span.mr-1 {{label}}:
      textarea.form-control.form-control-sm(
        :value="data[dataKey]"
        @change="update($event.target.value)"
      )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  /**
   */
  export default class TextareaOptionComp extends Vue {
    @Prop() label?: string;
    @Prop() data?: any;
    @Prop() dataKey?: string;

    update(v: string) {
      let update: any = Object.assign({}, this.data);
      update[this.dataKey!] = v;
      this.$emit("change", update);
    }
  }
</script>

<style lang="scss">
</style>
