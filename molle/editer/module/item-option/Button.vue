<template lang="pug">
  .item-option-button
    button.btn.btn-sm.btn-primary(@click="profile.click()")
      span(v-html="profile.label")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  /**
   */
  export default class ItemOptionButton extends Vue {
    @Prop() profile?: ItemOptionButtonProfile;
  }

  export class ItemOptionButtonProfile {
    name: string = "ItemOptionButton";
    label: string;
    click: () => void;

    constructor(opt: {
      label: string
      click: () => void
    }) {
      this.label = opt.label;
      this.click = opt.click;
    }
  }
</script>

<style lang="scss">
</style>
