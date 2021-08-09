<template lang="pug">
.module.vertical-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(:node="itemData.value.paragraph" :key="itemData.value.paragraph.id")
  ModuleLoader(:node="itemData.value.headline" :key="itemData.value.headline.id")
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class VerticalBox extends Module {
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
.vertical-box {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;

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

  // color
  &.-gray {
    background-color: $color-gray-600;
    @include mediaquery-not-sm {
      padding-top: $gutter*2;
      padding-bottom: $gutter*2;
    }
    @include mediaquery-sm {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  }

  &.-gray-box {
    border: 6px solid $color-border-light;
    padding: 1.5rem;
    background-color: $color-white;
    @include mediaquery-sm {
      padding: 1rem;
    }
  }

  &.-dark {
    background-color: $color-black;
    color: $color-text-white;
    padding-top: $gutter*2;
    padding-bottom: $gutter*2;
  }
}
</style>
