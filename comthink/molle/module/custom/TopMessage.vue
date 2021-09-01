<template lang="pug">
.module.top-message(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(:node="itemData.value.headline" :key="itemData.value.headline.id")
  ModuleLoader(:node="itemData.value.text" :key="itemData.value.text.id")

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class TopMessage extends Module {
}
</script>

<style lang="scss">
.module {
  &.top-message {
    background-color: rgba(255, 255, 255, 0.8);
    position: relative;
    z-index: 10;
    margin: -4rem 7% 8rem;
    padding: 3.9%;
  }
}
</style>
