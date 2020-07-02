<template lang="pug">
  .module
    .box(
      :class="getClass()"
    )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/ssr/module/Module";

  @Component({
    components: {}
  })
  export default class Box extends Module {
    // @Prop() itemData?: any;
    // @Prop() styleData?: any;

    // getClass() {
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
    // }
  }
</script>

<style lang="scss">
  .box {
    &:before, &:after {
      content: "";
      display: block;
    }

    &:before {
      margin-bottom: 2rem;
    }

    &:after {
      margin-bottom: 2rem;
    }
  }
</style>
