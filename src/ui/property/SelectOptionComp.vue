<template lang="pug">
  .item-option-select
    label.form-inline
      span.mr-1 {{label}}:
      select.form-control.form-control-sm(
        :value="data[dataKey]"
        @change="update($event.target.value)")
        option(v-for="item in select" :value="item" v-html="item")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  /**
   */
  export default class SelectOptionComp extends Vue {
    @Prop() label?: string;
    @Prop() select?: string[];
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
