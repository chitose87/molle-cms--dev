<template lang="pug">
.module.box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(:itemData="itemData", :label="`Box`")
</template>

<script lang="ts">
import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";

@Component({
  components: {AddModuleComp},
})
export default class Box extends Module {
}
</script>

<style lang="scss">
.box {
  margin-top: 1rem;
  margin-bottom: 3rem;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  //thema
  &.-quote {
    background-color: $color-gray-100;
    padding: 2rem 1rem;
    position: relative;

    &:before,
    &::after {
      position: absolute;
      font-size: 200%;
      line-height: 1;
    }

    &::before {
      content: "“";
      left: 0.5rem;
      top: 1rem;
    }

    &::after {
      content: "”";
      right: 0.5rem;
      bottom: 0rem;
    }
  }

  // color
  &.-dark {
    background-color: $color-black;
  }
}
</style>
