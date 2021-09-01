<template lang="pug">
.module.isview-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  :target="itemData.option.target",
  v-isview
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`Isview-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class IsviewBox extends Module {
}
</script>

<style lang="scss">
[data-isview] {
  transition: none;

  &.-slide {
    transition-property: opacity, transform;
    transition-duration: 0.8s, 0.8s;
    transition-delay: 0.3s, 0.3s;
    transition-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  &.-fade {
    transition-property: opacity, transform;
    transition-duration: 1.2s, 1.2s;
    transition-delay: 0.4s, 0.4s;
    transition-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
  }
}

[data-isview*="outview"] {
  opacity: 0;
  transform: translate3d(0, 0, 0);

  &.-slide {
    transform: translate3d(0, 100px, 0);
  }

  &.-fade {
    transform: translate3d(0, 0, 0);
  }
}

[data-isview="outview--on"] {
  &.-slide {
    transform: translate3d(0, -100px, 0);
  }
}
</style>
