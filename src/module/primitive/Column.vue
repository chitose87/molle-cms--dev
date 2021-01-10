<template lang="pug">
  .module.column(
    :id="itemData.tagId"
    :class="getClass(itemData)"
    :style="getStyle(itemData)"
  )
    ModuleLoader(
      v-for="id in itemData.value"
      :key="id"
      :itemId="id"
    )

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Module} from "~/src/module/Module";

  @Component({
    components: {}
  })
  export default class Column extends Module {
    //Unique Methods
    getStyle() {
      let obj = super.getStyle(this.itemData);

      //gutter
      let gutterH = this.getValue(this.itemData.option["gutter-h"]);
      let gutterV = this.getValue(this.itemData.option["gutter-v"]);

      if (gutterH) {
        obj["margin-left"] || (obj["margin-left"] = "-" + gutterH);
        obj["margin-right"] || (obj["margin-right"] = "-" + gutterH);
      }
      if (gutterV) {
        obj["margin-top"] || (obj["margin-top"] = "-" + gutterV);
        obj["margin-bottom"] || (obj["margin-bottom"] = "-" + gutterV);
      }
      return obj;
    }
  }
</script>

<style lang="scss">
  .column {
    display: flex;
  }
</style>
