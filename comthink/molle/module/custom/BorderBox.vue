<template lang="pug">
component.module.border-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`Border-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class BorderBox extends Module {
}
</script>

<style lang="scss">
.border-box {

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  //thema
  &.-blue {
    position: relative;
    margin: 2rem;
    padding: 2rem 2rem;
    border: solid 2px #6699FF;
    border-radius: 100% 70% 100% 75%/75% 100% 85% 100%;

    &:before,
    &::after {
      position: absolute;
      top: 0;
      content: "";
      width: 100%;
      height: 100%;
    }

    &::before {
      left: 0;
      border: solid 2px #00ECFF;
      transform: rotate(-0.3deg);
      border-radius: 90% 55% 75% 90%/85% 70% 80% 77%;
    }

    &::after {
      left: 0;
      border: groove 2px #0033FF;
      transform: rotate(0.9deg);
      border-radius: 70% 100% 60% 85%/95% 80% 100% 95%;
    }
  }
}
</style>
