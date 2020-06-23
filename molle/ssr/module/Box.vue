<template lang="pug">
  .module
    .box(
      :class="getClass()"
    )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class Box extends Vue {
    @Prop() itemData?: any;
    @Prop() styleData?: any;

    getClass() {
      // let obj: any = {};
      //
      // for (let key in this.styleData) {
      //   let value = this.styleData[key];
      //   switch (key) {
      //     case "align":
      //     case "theme":
      //     case "color":
      //       //.{value} 形式
      //       if (!value) break;
      //       obj[value] = true;
      //
      //       break;
      //     default:
      //       //.{key} 形式
      //       obj[key] = !!value;
      //       break;
      //   }
      // }
      // return obj;
    }
  }
</script>

<style lang="scss">
  .box {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
