<template lang="pug">
.list(
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
    :label="`List`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class List extends Module {
  static readonly CLASS_NAME = "List";
}
</script>

<style lang="scss">

.list {
  margin-top: 0;
  margin-bottom: 1rem;

  > .list {
    padding-left: 1.5rem;
    //default(=disc)
    > *:first-child:before {
      content: "●";
      position: absolute;
      transform: translateX(-100%);
      margin-left: -0.5rem;
    }

    &:last-child {
      margin-bottom: 1.5rem;
    }
  }

  //theme
  &.-number {
    .list {
      &:first-of-type {
        counter-reset: a;
      }

      > *:first-child:before {
        counter-increment: a;
        content: counters(a,"-") ".";
      }
    }
  }

  // none
  &.-none {
    > .list > *:first-child:before {
      display: none;
    }
  }
}
</style>
