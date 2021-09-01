<template lang="pug">
.module.visual-menu(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(:node="itemData.value.headline" :key="itemData.value.headline.id")
  ModuleLoader(:node="itemData.value.btnlist" :key="itemData.value.btnlist.id")

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class VisualMenu extends Module {
}
</script>

<style lang="scss">
.module {
  &.visual-menu {
    position: absolute;
    bottom: 1rem;
    left: 3rem;
    z-index: 10;
    margin: 0;
    padding: 0;

    .module {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &.headline{
        color: #777;
        font-weight: bold;
        margin-bottom: 1rem;
      }

      &.button-list {
        a {
          color: #777;
          font-weight: bold;
          margin: 0;
          padding: 0.25rem;
          height: 2.5rem;
          justify-content: center;
        }
      }
    }

  }
}
</style>
