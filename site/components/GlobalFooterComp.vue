<template lang="pug">
footer.global-footer
  ModuleLoader.global-footer__body(:node="{id:'--no-export%2Fglobal_footer'}")
</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {}
})
export default class GlobalFooterComp extends Vue {
}
</script>

<style lang="scss">
.global-footer {
  //background: $color-gray-700;
  @include mediaquery-not-sm {
    //margin-top: 5rem;
  }
  @include mediaquery-sm {
    //margin-top: 2rem;
  }

  &__body {
    text-align: center;
    background: $color-gray-900;
    @include mediaquery-not-sm {
      //margin-top: -5rem;
      padding-top: 5rem;
      padding-bottom: 3rem;
      margin-bottom: 0;
    }
    @include mediaquery-sm {
      //margin-top: -2rem;
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
    }

    .button-list {
      margin-bottom: 0.5rem;
    }
  }

  &__nav {
    text-align: center;
    margin-top: 0;
    color: $color-white;

    > * {
      margin: 0;
    }
  }

  .button {
    color: $color-white;
    display: inline-block;

    &:hover {
      color: $color-link;
      text-decoration: underline;
    }
  }

  &__insta.button, &__tw.button, &__fb.button {
    min-width: auto;
    padding: 0.5rem;
    border: none;
    width: 3rem;
    margin: 0;
    text-decoration: none;

    span, &:after {
      display: none;
    }
  }

  &__insta {
    &:before {
      @include icon-instagram;
    }
  }

  &__tw {
    &:before {
      @include icon-twitter;
    }
  }

  &__fb {
    &:before {
      @include icon-facebook;
    }
  }

  //プラポリ
  &__pp {
    text-decoration: none;
  }

  //.site-map
  .site-map {
    @include mediaquery-sm {
      display: none;
    }
    pointer-events: inherit;
    height: auto;
    text-align: left;
    justify-content: center;

    &__body {
      flex-direction: row;
      border-bottom: 1px solid $color-gray-600;
      padding-bottom: 2rem;
      margin-bottom: 1rem;
    }

    &__1st {
      margin-right: 3rem;
      margin-bottom: 0;

      > .button {
        font-weight: bolder;
        font-size: 18px;
      }
    }

    &__2nd {
      padding-left: 0rem;

      > .button {
        font-size: 16px;
        display: block;
      }
    }

    &__link {
      margin-left: 1rem;

      > .button {
        display: block;
        font-size: 16px;
      }
    }
  }
}
</style>
