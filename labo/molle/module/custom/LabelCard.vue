<template lang="pug">
.label-card(
  :id="itemData.tagId",
)
  .label-card__bg
    .label-card__bg__upper
    .label-card__bg__lower
  ModuleLoader.label-card__img(:node="itemData.value.img" :key="itemData.value.img.id")
  ModuleLoader.label-card__title(:node="itemData.value.headline" :key="itemData.value.headline.id")
  ModuleLoader.label-card__lead(:node="itemData.value.text" :key="itemData.value.text.id")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class LabelCard extends Module {
  //Unique Methods
}
</script>

<style lang="scss">
.label-card {
  //font-family: 'Alex Brush', cursive;
  //font-family: 'Audiowide', cursive;
  //font-family: 'Libre Barcode 39 Text', cursive;
  font-family: 'Righteous', cursive;
  //font-family: 'Vibur', cursive;
  //font-family: 'Yesteryear', cursive;
  position: relative;
  overflow: hidden;
  color: #000000;
  background-color: #fff;

  $r: 28vw;
  $b: 10px;
  $p: calc((#{$r/2} + #{$b}) * -1);
  @include mediaquery-not-sm {
    width: 80%;
    height: 80vw;
  }
  @include mediaquery-sm {
    height: 140vw;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: $b solid $color-black;

    &:before {
      content: "";
      position: absolute;
      top: $r/8;
      left: $r/8;
      width: calc(100% - #{$r/4});
      height: calc(100% - #{$r/4});
      border: 2px solid $color-black;
      z-index: $zindex-on;
    }

    &__upper, &__lower {
      &:before, &:after {
        content: "";
        display: block;
        position: absolute;
        width: $r;
        height: $r;
        background: $color-white;
        border: $b solid $color-black;
        transform: rotate(45deg);
        //border-radius: $r/2;
      }

      &:before {
        left: $p;
      }

      &:after {
        right: $p;
      }
    }

    &__upper {
      &:before, &:after {
        top: $p;
      }
    }

    &__lower {
      &:before, &:after {
        bottom: $p;
      }
    }
  }

  &__img {
    max-width: 60%;
    max-height: 60%;
    width: 100%;
    height: auto;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__title {
    font-size: 18vw;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:after {
      content: "";
      display: block;
      width: 16vw;
      border-top: 10px solid #000;
      position: relative;
      //top: -3vw;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__lead {
    font-size: 9vw;
    margin-bottom: 8vw;
    font-family: 'Libre Barcode 39 Text', cursive;
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
