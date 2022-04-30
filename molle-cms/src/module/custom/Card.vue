<template lang="pug">
.module.universal-card(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader.universal-card__img(:node="itemData.value.img")

  ModuleLoader.universal-card__title(:node="itemData.value.headline")
  ModuleLoader.universal-card__text(:node="itemData.value.text")
  ModuleLoader.universal-card__btn-list(:node="itemData.value.btnList")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Card extends Module {
  static readonly CLASS_NAME = "Card";
  //Unique Methods
}
</script>

<style lang="scss">
.universal-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 2px solid $color-black;
  overflow: hidden;
  //margin-top: 0;
  //margin-bottom: 0;
  @include mediaquery-not-sm {
    padding-right: 2rem;
    padding-left: 2rem;
    padding-bottom: 1rem;
  }
  @include mediaquery-sm {
    padding-right: 1rem;
    //padding-bottom: 0.5rem;
    padding-left: 1rem;
  }

  &__img.picture {
    width: auto;
    position: relative;
    padding-top: (9/16*100%);
    overflow: hidden;
    //margin-top: 0;
    @include mediaquery-not-sm {
      margin-left: -2rem;
      margin-right: -2rem;
      margin-bottom: 2rem;
    }
    @include mediaquery-sm {
      margin-left: -1rem;
      margin-right: -1rem;
      margin-bottom: 1rem;
    }

    img {
      object-fit: cover;
      object-position: center center;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      //aspect-ratio: 16 / 9;
    }
  }

  &__title {
    margin-top: 0rem;
    margin-bottom: 0rem;
    height: 3em;
  }

  &__text {
    //margin-top: 0;
    //margin-bottom: 1rem;
  }

  &__btn-list {
    margin-top: auto;
    //margin-bottom: 1rem;

    .button {
    }
  }

  //thema
  &.-outside {
    border: 2px solid $color-black;
    background-color: $color-white;
    text-align: center;
    border-radius: 1rem;

    .universal-card {
      &__img.picture {
        margin-bottom: 1rem;
      }

      &__title {
        font-weight: bolder;

        .headline__sub {
          font-size: 16px;
          margin-top: 0.2rem;
        }
      }

      &__text {

      }

      &__btn-list {

      }
    }
  }

  //color
  &.-light {
    background-color: $color-white;
    border: none;
  }
}
</style>
