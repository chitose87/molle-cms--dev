<template lang="pug">
.module.card(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(:node="itemData.value.img" :key="itemData.value.img.id")
  ModuleLoader(:node="itemData.value.headline" :key="itemData.value.headline.id")
  ModuleLoader(:node="itemData.value.text" :key="itemData.value.text.id")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Card extends Module {
  static readonly CLASS_NAME = "Card";
  //Unique Methods
}
</script>

<style lang="scss">
.module.card {
}
</style>
