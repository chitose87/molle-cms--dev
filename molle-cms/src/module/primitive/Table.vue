<template lang="pug">
table.module.table(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  tbody
    tr(v-for="(row, rowI) in _data")
      component(
        v-for="(col, colI) in row",
        :is="(itemData.option.columnHeading && colI == 0) || (itemData.option.lineHeading && rowI == 0) ? 'th' : 'td'",
        :key="rowI + 'x' + colI"
      )
        span(v-html="$getText(col)")
</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Table extends Module {
  static readonly CLASS_NAME = "Table";
  _data: any[][] = [];

  @Watch("itemData.value", {immediate: true})
  changeValue(csv: string, before: string) {
    csv.split("\n").forEach((row: string, rowI: number) => {
      this._data[rowI] = [];
      row.split(",").forEach((col: string, colI: number) => {
        if (col) this._data[rowI][colI] = col;
      });
    });
  }
}
</script>

<style lang="scss">
.table {
  width: 100%;
  //margin-top: 3rem;
  margin-bottom: 1.5rem;
  border-collapse: collapse;
  tr {
  }
  th,
  td {
    padding: 1rem 2rem;
  }
  th {
    color: $color-black;
    background: $color-gray-200;
    border: solid 1px $color-gray-700;
    &:first-child {
    }
  }
  td {
    border: solid 1px $color-gray-700;
  }
}
</style>
