<template lang="pug">
  section.section(
    :id="itemData.tagId",
    :class="getClass(itemData)",
    :style="getStyle(itemData)"
  )
    picture(v-if="itemData.class.theme=='bg -zone'")
      source(
        :media="`(max-width:${breakPoint - 1}px)`"
        :srcset="itemData.option.sp",
        :width="itemData.option.spSize?itemData.option.spSize.w+'px':'auto'"
        :height="itemData.option.spSize?itemData.option.spSize.h+'px':'auto'"
        :alt="itemData.option.alt")
      img.section__bg(
        loading="lazy"
        :src="itemData.option.bg"
        :width="itemData.option.size?itemData.option.size.w+'px':'auto'"
        :height="itemData.option.size?itemData.option.size.h+'px':'auto'")

    .section__body
      ModuleLoader(
        v-for="node in itemData.value",
        :key="node.id",
        :node="node"
      )

      AddModuleComp(
        :label="`Section`"
        :parentNode="loader.node"
      )
    style(v-if="itemData.css" v-html="itemData.css")
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class Section extends Module {
  static readonly CLASS_NAME = "Section";
  breakPoint = process.env.breakPoint;
}
</script>

<style lang="scss">
.section {
  position: relative;

  @include mediaquery-not-sm {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
  @include mediaquery-sm {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  &__body {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    @include mediaquery-not-sm {
      max-width: $size-container;
      padding-left: $gtr;
      padding-right: $gtr;
    }
    @include mediaquery-sm {
      padding-left: $gtr/2;
      padding-right: $gtr/2;
    }

    & & {
      max-width: inherit;
      padding-left: 0;
      padding-right: 0;
    }

    .container {
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }

  //s-
  &.-zone {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    &, &.s-0, &.s-sm, &.s-md, &.s-lg {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &.-zone {
    .section__body {
      &::before,
      &::after {
        content: "";
        display: block;
      }

      &::before {
        margin-bottom: $gtr;
      }

      &::after {
        margin-top: $gtr;
      }
    }

    &.s-0 .section__body {
      padding-top: 0.1px;
      padding-bottom: 0.1px;
      padding-left: 0;
      padding-right: 0;

      &::before, &::after {
        display: none;
      }
    }
  }

  @mixin _func($label,$tb,$lr:false) {
    &.s-#{$label} {
      margin-top: $tb;
      margin-bottom: $tb;
    }
    &.-zone {
      &.s-#{$label} {
        .section__body {
          //@if ($lr) {
          //  padding-left: $lr;
          //  padding-right: $lr;
          //}

          &:before {
            margin-bottom: ($tb - 0.5rem);
          }

          &:after {
            margin-top: ($tb - 0.5rem);
          }
        }
      }
    }
  }
  @include mediaquery-not-sm {
    @include _func("sm", 2rem, 1rem);
    @include _func("md", 5rem, $gtr);
    @include _func("lg", 10rem, 5rem);
    //&.s-sm {
    //  @at-root .section__body &,.container & {
    //    padding-left: 1rem;
    //    padding-right: 1rem;
    //  }
    //}
  }
  @include mediaquery-sm {
    @include _func("sm", 0.5rem, 0.5rem);
    @include _func("md", 4rem, $gtr/2);
    @include _func("lg", 8rem, 3rem);
    //&.s-sm {
    //  @at-root .section__body &,.container & {
    //    padding-left: 0.5rem;
    //    padding-right: 0.5rem;
    //  }
    //}
  }

  // is bg
  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    object-fit: cover;
    object-position: center center;
  }

  //color
  &.c-secondary {
    background-color: $color-gray-100;
  }

  &.c-black {
    background-color: rgba($color-gray-900, 0.85);
    backdrop-filter: blur(10px);
    transform: skewY(-7deg);

    .section__body {
      transform: skewY(7deg);
    }
  }

  &.c-white {
    background-color: $color-white;
  }

  //theme
  &.t-bg {
  }

  //コンテンツ幅の中での振る舞い
  @at-root .container,&__body {
    .section.-zone {
      .section__body {
        margin-left: $gtr * -1;
        margin-right: $gtr * -1;
        padding-left: $gtr;
        padding-right: $gtr;

        //  @mixin _func($label,$v) {
        //    &.s-#{$label} {
        //      margin-left: $v * -1;
        //      margin-right: $v * -1;
        //    }
        //  }
        //  @include mediaquery-not-sm {
        //    @include _func("sm", $gtr);
        //    @include _func("md", $gtr);
        //    @include _func("lg", 5rem);
        //  }
        //
        //  @include mediaquery-sm {
        //    @include _func("sm", $gtr/2);
        //    @include _func("md", $gtr/2);
        //    @include _func("lg", 3rem);
        //  }
      }
    }
  }
}
</style>
