<template lang="pug">
ModuleLoader(
  :node="itemData.value"
  :data-molle-reference="$route.query.edit"
)
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class Reference extends Module {
  static readonly CLASS_NAME = "Reference";
  @Prop() static__value?: string;
}
</script>

<style lang="scss">
</style>
