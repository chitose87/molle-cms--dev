<template lang="pug">
.module.background-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  picture
    source(
      media="(max-width:" + (process.env.breakPoint - 1) + "px)"
      :srcset="itemData.option.bgSp",
      :alt="itemData.option.alt"
    )
    img.background-box__bg(:src="itemData.option.bg", :alt="itemData.option.alt")

  .background-box__body
    ModuleLoader(
      v-for="node in itemData.value",
      :key="node.id",
      :node="node"
    )

  AddModuleComp(
    :label="`BG-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";

@Component({
  components: {AddModuleComp},
})
export default class BackgroundBox extends Module {
}
</script>

<style lang="scss">
.background-box {
  margin-top: 1rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 0;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    object-fit: cover;
    object-position: center center;
    z-index: -1;
  }

  &__body {
  }

  //thema


  // color
  &.-dark {
  }
}
</style>
