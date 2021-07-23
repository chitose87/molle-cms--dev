<template lang="pug">
.module.button-list(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

  AddModuleComp.col-12(
    :label="`ButtonList`",
    :parentNode="loader.node"
    :style="{width: '100%'}"
  )
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class ButtonList extends Module {
  //Unique Methods
  getClass() {
    let obj = super.getClass(this.itemData);

    if (this.itemData.option.col) {
      if (this.itemData.option.col == -1) {
        obj["column-col"] = true;
      } else {
        obj["column-col-" + this.itemData.option.col] = true;
      }
    }
    if (this.itemData.option.colSm) {
      if (this.itemData.option.colSm == -1) {
        obj["column-col-sm"] = true;
      } else {
        obj["column-col-sm-" + this.itemData.option.colSm] = true;
      }
    }
    return obj;
  }

}
</script>

<style lang="scss">
.button-list {
  display: flex;
  flex-wrap: wrap;
  @include mediaquery-not-sm {
    margin-top: -2rem;
    margin-right: -1rem;
    margin-left: -1rem;
    margin-bottom: 1rem;
  }
  @include mediaquery-sm {
    margin-top: -1.5rem;
    margin-right: -0.75rem;
    margin-left: -0.75rem;
    margin-bottom: 0.75rem;
  }

  > * {
    @include mediaquery-not-sm {
      padding-top: 2rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    @include mediaquery-sm {
      padding-top: 1.5rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  }

  @for $i from 1 through 12 {
    &-col-#{$i} > * {
      @include col($i);
    }
    @include mediaquery-sm {
      &-col-sm-#{$i} > * {
        @include col($i);
      }
    }
  }

  &.text-left {
    justify-content: flex-start;
  }

  &.text-center {
    justify-content: center;
  }

  &.text-right {
    justify-content: flex-end;
  }

  .button {
    padding: 1rem;
  }
}
</style>
