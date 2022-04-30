<template lang="pug">
.module.column(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .row(:class="itemData.option.justify?'justify-content-'+itemData.option.justify:''")
    ModuleLoader(
      v-for="node in itemData.value", :key="node.id", :node="node"
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
  margin-bottom: 1.5rem;
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
    @include mediaquery-not-sm {
      margin-bottom: 0;
    }
    @include mediaquery-sm {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
