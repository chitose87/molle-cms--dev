<template lang="pug">
.module.list-item-box(
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
    :label="`ListItemBox`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class ListItemBox extends Module {
  static readonly CLASS_NAME = "ListItemBox";
}
</script>

<style lang="scss">

.list-item-box {
  > .list-item-box {
    padding-left: 1.5rem;
    padding-bottom: 1rem;
    //default(=auto)
    > *:first-child:before {
      position: absolute;
      transform: translateX(-100%);
      margin-left: -0.5rem;
    }
  }


  // disc
  &.-disc {
    > .list-item-box > *:first-child:before {
      content: "●";
    }
  }

  //theme
  &.-number {
    > .list-item-box {
      &:first-of-type {
        counter-reset: a;
      }

      > *:first-child:before {
        counter-increment: a;
        content: counter(a) ".";
      }

      //2nd
      > .list-item-box {
        &:first-of-type {
          counter-reset: b;
        }

        > *:first-child:before {
          counter-increment: b;
          content: counter(a) "-" counter(b) ".";
        }

        //3rd
        > .list-item-box {
          &:first-of-type {
            counter-reset: c;
          }

          > *:first-child:before {
            counter-increment: c;
            content: counter(a) "-" counter(b) "-" counter(c) ".";
          }

          // 4th-
          > .list-item-box > *:first-child:before {
            content: "●";
          }
        }
      }
    }
  }

  // none
  &.-none {
    > .list-item-box > *:first-child:before {
      display: none;
    }
  }
}
</style>
