<template lang="pug">
  .module
    component(
      :is="lv"
    )
      span(v-html="text")

    div
      select(v-model="lv" @change="update")
        option h1
        option h2
        option h3
        option h4
        option h5
        option h6

      input(type="text" v-model="text" @change="update")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class Headline extends Vue {
    text: string = "";
    lv: string = "h3";

    mounted() {

    }
    // change(value: string) {
    //   this.text = value;
    // }

    update() {

    }
  }
</script>

<style lang="scss">

</style>
