<template lang="pug">
component.module.list-item-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ul
    li(v-for="node in itemData.value")
      ModuleLoader(
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
  position: relative;
}

.list-item-box {
  > ul > li:first-child > * {
    position: relative;

    &:before {
      counter-increment: item-number;
      //content: counters(item-number, ".") " ";
      content: counter(item-number) ".";
      position: absolute;
      font-size: 1rem;
      line-height: 1;
      left: -2rem;
      top: 50%;
      margin-top: -0.5rem;
    }
  }
}

.-number {
  .list-item-box {
    > ul > li:first-child > * {
      &:before {
        //default
      }
    }
  }
}

.-circle {
  .list-item-box {
    > ul > li:first-child > * {
      position: relative;

      &:before {
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        background-color: #000000;
        border-radius: 50%;
        position: absolute;
        left: -2rem;
        top: 50%;
        margin-top: -0.25rem;
      }
    }
  }
}

.-triangle {
  .list-item-box {
    > ul > li:first-child > * {
      position: relative;

      &:before {
        content: "";
        width: 0;
        height: 0;
        border-width: 0.5rem;
        border-style: solid;
        border-color: transparent transparent transparent #000000;
        position: absolute;
        left: -2rem;
        top: 50%;
      }
    }
  }
}

.-square {
  .list-item-box {
    > ul > li:first-child > * {
      position: relative;

      &:before {
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        background-color: #000000;
        position: absolute;
        left: -2rem;
        top: 50%;
        margin-top: -0.25rem;
      }
    }
  }
}

</style>
