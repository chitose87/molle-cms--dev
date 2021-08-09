<template lang="pug">
p.module.vertical-paragraph(
  :id="itemData.tagId",
  :is="itemData.option.tag || 'p'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-html="itemData.value || itemData.superValue || ''"
)
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class VerticalParagraph extends Module {
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
    if (obj.lineHeight) {
      obj.lineHeight = obj.lineHeight + "%"
    }
    if (obj.padding) {
      console.log("obj.padding", obj.padding)
      obj.padding = obj.padding + "% 0 "
      console.log("obj.padding", obj.padding)
    }
    let parentOpt;
    try {
      parentOpt = this.$parent.$parent.$props.itemData.option;
    } catch (e) {
      parentOpt = {};
    }
    return obj;
  }
}
</script>

<style lang="scss">
.vertical-paragraph {
  margin: 0;
  padding: 2rem;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 1.25vw;

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

  &.-caption {
    font-size: 14px;
    color: $color-gray-500;
  }
}
</style>
