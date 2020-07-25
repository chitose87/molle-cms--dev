<template lang="pug">
  picture(
  )
    source(v-if="getValue('sp')" media="(max-width: 767px)" :srcset="getValue('sp')" :alt="getValue('alt')")
    img(
      :src="getValue('src')" :alt="getValue('alt')"
      :class="getClass(itemDataProp)"
    )

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/molle/ssr/module/Module";

  @Component({
    components: {}
  })
  export default class Picture extends Module {
    getValue(key: string) {
      return (this.itemDataProp.value || {})[key]
        || (this.itemDataProp.superValue || {})[key];
    }
  }
</script>

<style lang="scss">
  .module {
  }
</style>
