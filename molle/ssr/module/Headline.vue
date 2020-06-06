<template lang="pug">
  .module
    component(
      :is="itemData.option.lv"
      v-html="valueData.value || valueData.superValue"
      :class="getClass()"
    )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class Headline extends Vue {
    @Prop() itemData?: any;
    @Prop() valueData?: any;
    @Prop() styleData?: any;

    getClass() {
      let obj: any = {};

      for (let key in this.styleData) {
        let value = this.styleData[key];
        switch (key) {
          case "align":
          case "theme":
          case "color":
            //.{value} 形式
            if (!value) break;
            obj[value] = true;

            break;
          default:
            //.{key} 形式
            obj[key] = !!value;
            break;
        }
      }
      return obj;
    }
  }
</script>

<style lang="scss">
  .module {
    .test {
      width: 50%;
      margin: auto;
    }

    .dark {
      background-color: $black;
      color: $white;
    }
  }
</style>
