<template lang="pug">
.module.box.column__item(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

  AddModuleComp(
    :parentNode="loader.node"
    :label="`ColumnBox`"
  )
</template>

<script lang="ts">
import {Component, Prop, Watch} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class ColumnBox extends Module {
  static readonly CLASS_NAME = "ColumnBox";

  getClass() {
    let obj = super.getClass(this.itemData);
    if (this.itemData.option.col) {
      if (this.itemData.option.col == -1) {
        obj["col"] = true;
      } else {
        obj["col-" + this.itemData.option.col] = true;
      }
    }
    if (this.itemData.option.colSm) {
      if (this.itemData.option.colSm == -1) {
        obj["col-sm"] = true;
      } else {
        obj["col-sm-" + this.itemData.option.colSm] = true;
      }
    }
    return obj;
  }

  getStyle() {
    let obj = super.getStyle(this.itemData);
    // let selfOpt = this.itemData.option || {};
    let parentOpt;
    try {
      parentOpt = this.$parent.$parent.$props.itemData.option;
    } catch (e) {
      parentOpt = {};
    }
    // let attrs = ["flexBasis"];
    // for (let attr of attrs) {
    //   obj[attr] = selfOpt[attr] || parentOpt[attr];
    // }

    //gutter
    // let gutterH = this.getValue(parentOpt["gutter-h"]);
    // if (gutterH) {
    //   obj["padding-left"] || (obj["padding-left"] = gutterH);
    //   obj["padding-right"] || (obj["padding-right"] = gutterH);
    // }
    // let gutterV = this.getValue(parentOpt["gutter-v"]);
    // if (gutterV) {
    //   obj["padding-top"] || (obj["padding-top"] = gutterV);
    //   obj["padding-bottom"] || (obj["padding-bottom"] = gutterV);
    // }
    return obj;
  }
}
</script>

<style lang="scss">
.column__item {
  &.col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }

  @for $i from 1 through 12 {
    &.col-#{$i} {
      @include col($i);
    }
    @include mediaquery-sm {
      &.col-sm-#{$i} {
        @include col($i);
      }
    }
  }
}
</style>
