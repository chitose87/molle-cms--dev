<template lang="pug">
.module.column__item(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

  AddModuleComp(
    :itemData="itemData",
    :label="`ColumnBox`"
  )
</template>

<script lang="ts">
import {Component, Prop, Watch} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";

@Component({
  components: {AddModuleComp},
})
export default class ColumnBox extends Module {
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
}
</style>
