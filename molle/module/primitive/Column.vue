<template lang="pug">
.module.row.column(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

  AddModuleComp.col-12(
    :itemData="itemData",
    :label="`Column`",
    :style="{width: '100%'}"
  )
</template>

<script lang="ts">
import {Component} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";

@Component({
  components: {AddModuleComp},
})
export default class Column extends Module {
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
  > * {
    @include mediaquery-not-sm {
      padding: 0.75rem;
    }
    @include mediaquery-sm {
      padding: 0.25rem 0.5rem;
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
}
</style>
