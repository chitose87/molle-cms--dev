<template lang="pug">
.horizon-card(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .row
    .col-4.col-sm-12
      ModuleLoader.horizon-card__img(:node="itemData.value.img")
    .col.col-sm-12.horizon-card__body
      div
        ModuleLoader.horizon-card__title(:node="itemData.value.title")
        ModuleLoader.horizon-card__text(:node="itemData.value.text")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class HorizonCard extends Module {
  static readonly CLASS_NAME = "HorizonCard";
  //Unique Methods
}
</script>

<style lang="scss">
.horizon-card {
  @include mediaquery-not-sm {
    margin-bottom: 2rem;
  }
  @include mediaquery-sm {
    & + .horizon-card {
      padding-top: 2rem;
      border-top: 1px solid $color-border;
      margin-top: 2rem;
    }
  }

  &__title {
    margin-top: 0;
  }

  &__text {
    margin-bottom: 1rem;
  }

  &__img {
    margin-top: 0;
    margin-bottom: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    div {
      width: 100%;

      > *:first-child {
        margin-top: 0;
      }

      > *:last-child {
        margin-bottom: 0;
      }
    }

    @include mediaquery-sm {
      .button {
        width: 100%;
      }
    }

    @include mediaquery-sm {

    }
  }

  > .row {
    @include mediaquery-sm {
      flex-direction: column-reverse;
    }
  }

  //thema
  &.-reverse {
    > .row {
      @include mediaquery-not-sm {
        flex-direction: row-reverse;
      }
      //@include mediaquery-sm {
      //  flex-direction: column-reverse;
      //}
    }
  }

  //color
  &.-white {
    background-color: $color-white;
    padding: 1rem;
    height: 100%;
  }
}
</style>
