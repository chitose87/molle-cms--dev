<template lang="pug">
.module.isview-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-isview="{once:itemData.option.once}"
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`IsviewBox`"
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
  static readonly CLASS_NAME = "IsviewBox";
}
</script>

<style lang="scss">
[data-isview] {
  //transition: none;
  &.-slide {
    transition: opacity $tick*2 $easeOut,
    transform $tick*2 $easeIn;
  }

  &.-fade {
    transition: opacity $tick*2 $easeOut;
  }
}

[data-isview*="outview"] {
  &.-slide {
    opacity: 0;
    transform: translate3d(0, 100px, 0);
  }

  &.-fade {
    opacity: 0;
  }
}

[data-isview="outview--on"] {
  &.-slide {
    transform: translate3d(0, -100px, 0);
  }
}
</style>
