<template lang="pug">
.module.dev-module-guide(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  h3.dev-module-guide__headline
    span(v-html="itemData.option.module")

  .column
    .column__item.col-3
      .dev-module-guide__left
        div(
          v-if="itemData.option.module"
          v-for="moduleObj in [$molleModules[itemData.option.module]]"
        )
          p(v-html="moduleObj.ref.CLASS_NAME")
          p(v-html="moduleObj.profile.CLASS_NAME")

        p(v-html="itemData.option.memo")
    .column__item.col
      .container

        ModuleLoader(
          v-for="node in itemData.value",
          :key="node.id",
          :node="node"
        )

        AddModuleComp(
          :label="`DevModuleGuide`"
          :parentNode="loader.node"
        )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class DevModuleGuide extends Module {
  static readonly CLASS_NAME = "DevModuleGuide";

  mounted() {

  }
}
</script>

<style lang="scss">
.dev-module-guide {
  border: 1px solid $color-border;
  padding: 1rem;

  &__left{
    border-right: 1px solid $color-border;
  }

  &__headline {
    margin-top: 0;
    border-bottom: 1px solid $color-border;
  }
}
</style>
