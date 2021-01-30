<template lang="pug">
  header.global-header(:aria-expanded="isMenuOpen")
    a.company-name(href="/")
      img(src="/imgs/company-name.svg")

    .global-header__menu
      button.global-header__menu__btn.isSp(type="button" @click="()=>isMenuOpen=!isMenuOpen")
        span.global-header__menu__btn__line
        span.global-header__menu__btn__label

      ul.global-header__menu__body
        li.global-header__menu__item
          a(href="/about")
            span 組合について
        li.global-header__menu__item
          a(href="/howto")
            span  木材利用について
        li.global-header__menu__item
          a(href="/case-study")
            span  活用事例
        li.global-header__menu__item
          a(href="https://morinokatsujin.com/" target="_blank")
            span  秩父木材について
        li.global-header__menu__item
          a(href="/member")
            span  組合員紹介
        li.global-header__menu__item
          a(href="/news")
            span  お知らせ
        li.global-header__menu__item
          a(href="/qa")
            span  Q&A
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class GlobalHeaderComp extends Vue {
    isMenuOpen = false;

    mounted() {

    }
  }
</script>

<style lang="scss">
  .global-header {
    $pcH: 4.5rem;
    $spH: 4rem;

    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
    max-width: 100vw;
    background: $color-white;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    @include mediaquery-not-sm {
      display: flex;
      align-items: center;
      height: $pcH;
    }
    @include mediaquery-sm {
      min-height: $spH;
      max-height: 100%;
      overflow: hidden;
    }

    //company-name
    .company-name {
      @include mediaquery-not-sm {
        margin-left: 1.5rem;
        margin-right: auto;
        img{
          width: 238px;
          height: 46px;
        }
      }
      @include mediaquery-sm {
        height: $spH;
        padding-left: 1rem;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        img {
          width: 166px;
          height: auto;
        }
      }
    }

    &__menu {
      @include mediaquery-not-sm{
        height: 100%;
      }
      &__btn {
        position: absolute;
        top: 0;
        right: 4.5rem;
        width: 4.5rem;
        height: $spH;
        background-color: $color-white;
        border: none;

        &__line, &:before, &:after {
          display: block;
          width: 20px;
          height: 2px;
          background-color: $color-black;
          position: absolute;
          top: (26px - 1px);
          left: 26px;
          border-radius: 1px;
        }

        &:before {
          content: "";
          transform: translateY(-8px);
        }

        &:after {
          content: "";
          transform: translateY(8px);
        }

        &__label {
          width: 100%;
          font-size: 10px;
          position: absolute;
          left: 0;
          bottom: 10px;
          line-height: 1;
        }
      }

      &__body {
        @include mediaquery-not-sm {
          margin-left: auto;
          margin-right: 2rem;
          height: 100%;
          display: flex;
          margin-bottom: 0;
        }
        @include mediaquery-sm {
          width: 100%;
          padding-top: ($spH + 1rem);
          padding-bottom: 3rem;
        }
      }

      &__item {
        @include mediaquery-not-sm {
          a {
            margin-left: 0.9rem;
            margin-right: 0.9rem;
            display: inline-flex;
            height: 100%;
            align-items: center;
            text-decoration: none;
            position: relative;
            color: $color-gray-700;
            transition: all $tick $easeInOut;

            &:before {
              content: '';
              position: absolute;
              left: 0.5rem;
              bottom: 0;
              width: calc(100% - 1rem);
              height: 4px;
              border-radius: 2px;
              background: $color-green;
              transform: translateY(-1rem);

              opacity: 0;
              transition: all $tick $easeOut;
            }

            &:hover {
              color: $color-green;

              &:before {
                opacity: 1;
                transform: translateY(0rem);
              }
            }
          }
        }
        @include mediaquery-sm {
          margin-top: 1rem;
          text-align: center;
          a {
            text-decoration: none;
            color: $color-gray-700;
            display: inline-block;
            padding: 0.5rem 1rem;
          }
        }
      }
    }

    &__contact {
      height: 100%;
      text-align: center;
      background-color: $color-black;
      padding-top: 10px;
      padding-bottom: 10px;
      transition: all $tick $easeInOut;
      text-decoration: none;
      color: $color-white;
      @include mediaquery-not-sm {
        width: 120px;
      }
      @include mediaquery-sm {
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        width: 4.5rem;
        height: $spH;
        span {
          position: absolute;
          left: 0;
          bottom: 10px;
          width: 100%;
          font-size: 10px;
          line-height: 1;
        }
      }

      &:hover {
        background-color: $color-yellow;
      }

      span {
        display: block;
      }
    }

    @include mediaquery-sm {
      //sp menu closed
      &:not([aria-expanded=true]) {
        height: 0;
        transition: height $tick $easeOut;

        .global-header {
          &__menu {
            &__btn {
              &__line, &:before, &:after {
                transition: all $tick $easeInOut;
              }

              &:before {
                transform: translateY(-8px);
              }

              &:after {
                transform: translateY(8px);
              }

              &__label:before {
                content: "メニュー";
              }
            }
          }
        }
      }

      //sp menu opend
      &[aria-expanded=true] {
        height: 100%;
        transition: height $tick $easeInOut;

        .global-header {
          &__menu {
            &__btn {
              &__line, &:before, &:after {
                transition: all $tick $easeInOut;
              }

              &__line {
                transform: scaleX(0);
              }

              &:before {
                transform: rotate(-45deg);
              }

              &:after {
                transform: rotate(45deg);
              }

              &__label:before {
                content: "閉じる";
              }
            }
          }
        }
      }
    }
  }
</style>
