<template lang="pug">
.label-card(
  :id="itemData.tagId",
)
  .label-card__bg
    .label-card__bg__upper
    .label-card__bg__lower
  //ModuleLoader.label-card__img(:node="itemData.value.img" :key="itemData.value.img.id")
  ModuleLoader.label-card__title(:node="itemData.value.headline" :key="itemData.value.headline.id")
  //ModuleLoader.label-card__lead(:node="itemData.value.text" :key="itemData.value.text.id")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class LabelCard extends Module {
  static readonly CLASS_NAME = "LabelCard";
  //Unique Methods
}
</script>

<style lang="scss">
.label-card {
  //font-family: 'Alex Brush', cursive;
  //font-family: 'Audiowide', cursive;
  //font-family: 'Libre Barcode 39 Text', cursive;
  //font-family: 'Righteous', cursive;
  //font-family: 'Vibur', cursive;
  //font-family: 'Yesteryear', cursive;
  position: relative;
  overflow: hidden;
  color: #000;
  //background-color: #fff;
  //border: 2px solid #fff;
  padding: 1rem;

  //background-image: url(/img/bg.svg);
  //background-size: 70px 70px;
  //background-repeat: repeat;
  margin-bottom: 20vw;

  $r: 8vw;
  //$b: 10px;
  //$p: calc((#{$r/2} + #{$b}) * -1);
  @include mediaquery-not-sm {
    width: 60%;
    height: 80vw;
  }
  @include mediaquery-sm {
    height: 100vw;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    //&:before {
    //  content: "";
    //  position: absolute;
    //  top: $r/2;
    //  left: $r/2;
    //  width: calc(100% - #{$r/1});
    //  height: calc(100% - #{$r/1});
    //  border: 6px solid $color-white;
    //  border-left: 0;
    //  border-right: 0;
    //  //z-index: $zindex-on;
    //}

    &__upper, &__lower {
      &:before, &:after {
        content: "";
        display: block;
        position: absolute;
        width: $r;
        height: $r;
        border: 1px solid #000;
        //background: $color-black;
        //border: $b solid $color-black;
        //transform: rotate(45deg);
        //border-radius: $r/2;
        z-index: $zindex-on;
      }
    }

    &__upper {
      &:before, &:after {
        top: 0;
        border-right: 0;
        border-bottom: 0;
      }
    }

    &__lower {
      &:before, &:after {
        bottom: 0;
        border-right: 0;
        border-bottom: 0;
        transform: scaleY(-1);
      }
    }

    &__upper, &__lower {
      &:before {
        left: 0;
      }

      &:after {
        right: 0;
        transform: rotate(90deg);
      }
    }
    &__lower:after{
      transform: rotate(-180deg);
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
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 90vw;
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: center;
    writing-mode: vertical-rl;
    align-items: center;
    margin: 0;
    line-height: 0;
    letter-spacing: 36px;
    transform: scaleY(0.65) translateY(5%);

    //&:after {
    //  content: "";
    //  display: block;
    //  width: 16vw;
    //  //border-top: 10px solid #000;
    //  position: relative;
    //  //top: -3vw;
    //  left: 50%;
    //  transform: translate(-50%, -50%);
    //}
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
