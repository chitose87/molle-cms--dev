<template lang="pug">
.modal(
  :id="itemData.tagId",
  v-if="isShow"
)
  .modal__fiexd(v-if="itemData")
    .modal__body(
      :class="getClass(itemData)",
      :style="getStyle(itemData)"
    )
      ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

      AddModuleComp(
        :parentNode="loader.node"
        :label="`Modal`"
        )
</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Modal extends Module {
  isShow = false;
}
</script>

<style lang="scss">
.modal {
  &__fiexd {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: $zindex-modal;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__close {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba($color-black, 0.75);
    top: 0;
    left: 0;
    z-index: -1;
  }

  &__body {
    max-width: $size-container;
    max-height: 90%;

    min-width: 30%;
    min-height: 30%;

    overflow: auto;
    background-color: $color-white;
    padding: 1rem;
  }
}
</style>
