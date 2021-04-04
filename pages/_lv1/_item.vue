<template lang="pug">
UniversalPage
</template>

<script lang="ts">
import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import UniversalPage from "~/pages/_universal.vue";

@Component({
  components: {UniversalPage},
})
export default class StaticPageLv2 extends Vue {
}
</script>

<style lang="scss">
</style>
