<template lang="pug">
  .module.carousel(
    :id="itemData.tagId",
    :class="getClass(itemData)",
    :style="getStyle(itemData)"
  )
    .carousel__body
      .row(:style="`transform: translateX(0%)`")
        ModuleLoader(
          v-for="node in itemData.value", :key="node.id", :node="node"
          :class="`col-${12/itemData.option.splits} col-sm-${12/itemData.option.splitsSp} `"
        )
        AddModuleComp(
          :label="`Box`",
          :parentNode="loader.node"
          :style="{width: '100%'}"
          :class="`col-${12/itemData.option.splits} col-sm-${12/itemData.option.splitsSp} `"
        )
      button.btn.carousel__prev(role="presentation")
      button.btn.carousel__next(role="presentation")

    .carousel__selector
      button.carousel__bullet
      button.carousel__bullet
      button.carousel__bullet
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Carousel extends Module {
  static readonly CLASS_NAME = "Carousel";

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
.carousel {
  margin-bottom: 1.5rem;
  @include mediaquery-not-sm {
  }
  @include mediaquery-sm {
  }

  //
  &__body {
    position: relative;

    & > .row {
      flex-wrap: nowrap;

      //> * {
      //  margin-top: 0;
      //  @include mediaquery-not-sm {
      //    margin-bottom: 0;
      //  }
      //  @include mediaquery-sm {
      //    margin-bottom: 0.5rem;
      //  }
      //}
    }
  }

  &__prev, &__next {
    position: absolute;
    top: 0;
    width: $gutter + 0px;
    height: 100%;
    background: transparent;
    border: 0;
    padding: 0;
    font-size: 22px;
  }

  &__prev {
    left: $gutter * -1px;

    &:after {
      @include icon-left-open;
    }
  }

  &__next {
    right: $gutter * -1px;

    &:after {
      @include icon-right-open;
    }
  }

  //
  &__selector {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__bullet {
    padding: 0.25rem;
    border: 0;
    background-color: transparent;
    margin-top: 1rem;

    &:before {
      content: "";
      background-color: $color-black;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      display: block;
    }
  }
}
</style>
