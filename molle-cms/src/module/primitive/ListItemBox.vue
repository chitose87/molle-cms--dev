<template lang="pug">
component.module.list-item-box(
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
.list-item-box:first-of-type {
  counter-reset: item-number;
}

.list-item-box {
  padding: 0 2rem 0 2rem;

  //default(=number)
  > *:first-child {
    position: relative;

    &:before {
      position: absolute;
      top: 50%;
      left: -2rem;
      counter-increment: item-number;
      font-size: 1rem;
      line-height: 1;
      content: counter(item-number) ".";
      margin-top: -0.5rem;
      width: auto;
      height: auto;
      background: none;
      border: none;
    }
  }

  //theme
  &.-number > *:first-child {
    &:before {
      counter-increment: item-number;
      font-size: 1rem;
      line-height: 1;
      content: counter(item-number) ".";
      margin-top: -0.5rem;
      width: auto;
      height: auto;
      background: none;
      border: none;
    }
  }

  &.-circle > *:first-child {
    &:before {
      content: "";
      margin-top: -0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      background-color: #000000;
      border-radius: 50%;
      border: none;
    }
  }

  &.-triangle > *:first-child {
    &:before {
      content: "";
      margin-top: -0.5rem;
      width: 0;
      height: 0;
      background: none;
      border-radius: 0;
      border-width: 0.5rem;
      border-style: solid;
      border-color: transparent transparent transparent #000000;
    }
  }

  &.-square > *:first-child {
    &:before {
      content: "";
      margin-top: -0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      background-color: #000000;
      border-radius: 0;
      border: none;
    }
  }
}

//子要素にthemeを反映
.list-item-box:first-of-type {
  &.-number {
    .list-item-box {
      > *:first-child {
        position: relative;

        &:before {
          counter-increment: item-number;
          font-size: 1rem;
          line-height: 1;
          content: counter(item-number) ".";
          margin-top: -0.5rem;
          width: auto;
          height: auto;
          background: none;
          border: none;
        }
      }
    }
  }
}

.list-item-box:first-of-type {
  &.-circle {
    .list-item-box {
      > *:first-child {
        position: relative;

        &:before {
          content: "";
          margin-top: -0.25rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #000000;
          border-radius: 50%;
          border: none;
        }
      }
    }
  }
}

.list-item-box:first-of-type {
  &.-triangle {
    .list-item-box {
      > *:first-child {
        position: relative;

        &:before {
          content: "";
          margin-top: -0.5rem;
          width: 0;
          height: 0;
          background: none;
          border-radius: 0;
          border-width: 0.5rem;
          border-style: solid;
          border-color: transparent transparent transparent #000000;
        }
      }
    }
  }
}

.list-item-box:first-of-type {
  &.-square {
    .list-item-box {
      > *:first-child {
        position: relative;

        &:before {
          content: "";
          margin-top: -0.25rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #000000;
          border-radius: 0;
          border: none;
        }
      }
    }
  }
}
</style>
