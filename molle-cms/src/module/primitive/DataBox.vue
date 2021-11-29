<template lang="pug">
.module.data-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class DataBox extends Module {
  static readonly CLASS_NAME = "DataBox";
}
</script>

<style lang="scss">
.data-box {
  margin-bottom: 1.5rem;
  @include mediaquery-not-sm {
    display: table;
    width: 100%;
  }
  //@include mediaquery-sm {
  //  width: 80%;
  //}
  margin-left: auto;
  margin-right: auto;

  //thema
  &.-auto {
    width: auto;
  }

  &.-md {
    @include mediaquery-not-sm {
      width: 80%;
    }
  }
}
</style>
