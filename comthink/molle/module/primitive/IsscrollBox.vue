<template lang="pug">
.module.isscroll-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  :target="itemData.option.target",
  v-isscroll
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`Isscroll-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class IsscrollBox extends Module {
}
</script>

<style lang="scss">
[data-isscroll] {
  transition-property: opacity, transform;
  transition-duration: 0.8s, 0.8s;
  transition-delay: 0.3s, 0.3s;
  transition-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
}

[data-isscroll*="outview"] {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.3s, 0.3s;
  transition-delay: 0.1s, 0.1s;
  transition-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
}

.isscroll-box{
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 9999;
}

</style>
