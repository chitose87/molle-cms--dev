<template lang="pug">
  .hoge
    p lv0
    p {{r}}
    //p(v-html="firebaseData.id")
    //p(v-html="firebaseData.allData.pages[firebaseData.id].path")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {Context} from '@nuxt/types';

  @Component({
    components: {}
  })
  export default class DynamicPage1 extends Vue {
    firebaseData: any;
    r: number = 0;

    async asyncData(context: Context) {
      // return {firebaseData: context.payload}
      return new Promise((resolve) => {
        setTimeout(() => {
          // this.r = Math.random();
          resolve({r: Math.random()});
        }, 2000)
      });
    }
  }
</script>

<style lang="scss">

</style>
