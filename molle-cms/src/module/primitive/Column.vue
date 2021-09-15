<template lang="pug">
.module.column(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .row
    ModuleLoader(
      v-for="node in itemData.value", :key="node.id", :node="node"
      :data-column-col="itemData.option.col"
      :data-column-colSm="itemData.option.colSm"
    )

    AddModuleComp.col-12(
      :label="`Column`",
      :parentNode="loader.node"
      :style="{width: '100%'}"
    )
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Column extends Module {
  static readonly CLASS_NAME = "Column";
  //Unique Methods

  // getStyle() {
  //   let obj = super.getStyle(this.itemData);
  //
  //   //gutter
  //   let gutterH = this.getValue(this.itemData.option["gutter-h"]);
  //   let gutterV = this.getValue(this.itemData.option["gutter-v"]);
  //
  //   if (gutterH) {
  //     obj["margin-left"] || (obj["margin-left"] = "-" + gutterH);
  //     obj["margin-right"] || (obj["margin-right"] = "-" + gutterH);
  //   }
  //   if (gutterV) {
  //     obj["margin-top"] || (obj["margin-top"] = "-" + gutterV);
  //     obj["margin-bottom"] || (obj["margin-bottom"] = "-" + gutterV);
  //   }
  //   return obj;
  // }
}
</script>

<style lang="scss">
.column {
  @include mediaquery-not-sm {
    //  margin-top: -2rem;
    //  margin-right: -1rem;
    //  margin-left: -1rem;
    //  margin-bottom: 1rem;
  }
  @include mediaquery-sm {
    //  margin-top: -1.5rem;
    //  margin-right: -0.75rem;
    //  margin-left: -0.75rem;
    //  margin-bottom: 0.75rem;
  }

  & > .row > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  &.text-left > .row {
    justify-content: flex-start;
  }

  &.text-center > .row {
    justify-content: center;
  }

  &.text-right > .row {
    justify-content: flex-end;
  }
}

@for $i from 1 through 12 {
  [data-column-col="#{$i}"] {
    @include col($i);
  }
  @include mediaquery-sm {
    [data-column-colSm="#{$i}"] {
      @include col($i);
    }
  }
}
</style>
