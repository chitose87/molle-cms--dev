<template lang="pug">
  header.global-header(:aria-expanded="isMenuOpen")
    .container-fluid
      .global-header__body
        a.company-name(href="/")
          img(src="/img/nct-logo.gif" width="260px" height="44px" alt="日本コムシンク株式会社")

        button.global-header__toggle(type="button" @click="()=>isMenuOpen=!isMenuOpen" aria-label="Menu")
          span.global-header__toggle__line
          span.global-header__toggle__label

        ModuleLoader(:node="{id:'--no-export%2Fglobal_header'}")

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class GlobalHeaderComp extends Vue {
  isMenuOpen = false;

  mounted() {

  }
}
</script>

<style lang="scss">
.global-header {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  max-width: 100vw;
  background: $color-white;
  //box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-bottom: 1px solid $color-black;
  overflow: hidden;

  @include mediaquery-not-sm {
    height: $header-height;
  }
  @include mediaquery-sm {
    height: $header-height-sp;
  }

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include mediaquery-not-sm {
      height: $header-height;
    }
    @include mediaquery-sm {
      height: $header-height-sp;
    }
  }

  //company-name
  .company-name {
    @include mediaquery-not-sm {
      height: 40px;
    }
    @include mediaquery-sm {
      height: 30px;
    }

    img {
      height: 100%;
      width: auto;
    }
  }

  //
  &__toggle {
    display: none;
    position: relative;
    height: 100%;
    background-color: transparent;
    border: none;
    padding: 0;
    width: 1em;
    margin-right: -0.25em;

    @include mediaquery-not-sm {
      font-size: $header-height;
    }

    @include mediaquery-sm {
      font-size: $header-height-sp;
    }

    &__line, &:before, &:after {
      content: "";
      display: block;
      width: 0.5em;
      height: 2px;
      background-color: $color-black;
      position: absolute;
      top: calc(0.5em - 1px);
      left: 0.25em;
      border-radius: 1px;
    }
  }


  &:not([aria-expanded=true]) {
    //transition: height $tick $easeOut;

    .global-header {
      &__body {
      }

      &__toggle {
        &__line, &:before, &:after {
          //transition: all $tick $easeInOut;
        }

        &:before {
          //transform: translateY(-0.14em);
        }

        &:after {
          //transform: translateY(0.14em);
        }
      }

      &__menu {
      }
    }
  }

  //sp menu opend
  //&[aria-expanded=true] {
  //  height: 100vh;
  //  transition: height $tick $easeInOut;
  //
  //  .global-header {
  //
  //    &__toggle {
  //      &__line, &:before, &:after {
  //        transition: all $tick $easeInOut;
  //      }
  //
  //      &__line {
  //        transform: scaleX(0);
  //      }
  //
  //      &:before {
  //        transform: rotate(-45deg);
  //      }
  //
  //      &:after {
  //        transform: rotate(45deg);
  //      }
  //    }
  //  }
  //
  //  .site-map {
  //    pointer-events: inherit;
  //  }
  //}
  .site-map {

    &__body {
      display: flex;

      .button {
      }
    }

    &__1st {
      margin-left: 1.5rem;
      > .button {
        text-decoration: none;
        &:after {
          display: none;
        }
      }
    }
  }
}

//site-map
.site-map {

  &__body {
    .button {
    }
  }

  &__1st {
    > .button {
      &:after {
      }
    }
  }

  &__2nd {
    > .button {
    }
  }
}
</style>
