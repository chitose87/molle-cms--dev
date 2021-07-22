<template lang="pug">
  div(v-if="$route.query.edit && $route.query.hidden !== 'true'")
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class Blank extends Vue {
}
</script>

<style lang="scss">
</style>
