<template lang="pug">
  .item-option-space
    label.form-inline
      SpaceFormComp(
        :label="label"
        :value="data[dataKey]"
        :negative="negative"
        @update="v=>update(v)"
      )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";
  import SpaceFormComp from "./SpaceFormComp.vue";

  @Component({
    components: {SpaceFormComp}
  })
  /**
   */
  export default class ItemOptionSpace extends Vue {
    @Prop() label?: string;
    @Prop() data?: any;
    @Prop() dataKey?: string;
    @Prop() negative?: boolean;

    update(v: string) {
      let update: any = Object.assign({}, this.data);
      update[this.dataKey!] = v;
      this.$emit("change", update);
    }
  }
</script>

<style lang="scss">
</style>
