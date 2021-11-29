<template lang="pug">
.main-visual
  picture.main-visual__img(v-if="pageData.theme && pageData.theme!='minimum'")
    source(
      :media="`(max-width:${breakPoint - 1}px)`"
      :srcset="pageData.mainVisualSp"
      alt=""
    )
    img(:src="pageData.mainVisual" alt="")
  .main-visual__body
    Headline(
      :static__value="pageData.displayTitle||pageData.title"
      :static__option="{lv:'h2',text:pageData.displayTitleSub}"
    )

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import {IPageData} from "~/molle-cms/src/interface";

@Component({
  components: {}
})
export default class MainVisual extends Vue {
  @Prop() pageData!: IPageData;
  breakPoint = process.env.breakPoint;

  mounted() {
  }
}
</script>

<style lang="scss">
.main-visual {
  position: relative;
  @include mediaquery-not-sm {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 7rem;
  }
  @include mediaquery-sm {
    margin-bottom: 5rem;
  }

  > .headline {
    margin-top: 0;
    margin-bottom: 0;
  }

  &__body {
    text-align: center;

    .headline {
      span {
        //text-align: center;
      }
    }
  }

  &__img {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  //&__bg {
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 100%;
  //  object-fit: cover;
  //  z-index: -1;
  //}
}

//
.theme {
  &--primary {
    .main-visual {
      height: 70vh;
      display: flex;

      &__img {
        flex: 1;
        height: 100%;
      }

      &__body {
        background-color: $color-white;
        //background-color: $color-blue-gray-200;
        @include mediaquery-not-sm {
          width: 35%;
          min-width: 200px;
          padding: 2rem;
        }
        @include mediaquery-sm {
          max-width: 94%;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          padding: 2rem 0.5rem;
        }

        .headline {
          text-align: left;
          @include mediaquery-not-sm {
            font-size: 36px;
            margin-top: 0;
            margin-bottom: 0;
          }
          @include mediaquery-sm {
            font-size: 28px;
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      }
    }
  }

  //&--primary-invert {
  //  .main-visual {
  //    height: 50vh;
  //    color: $color-white;
  //  }
  //}

  &--secondary {
    .main-visual {
      height: 30vh;
      display: flex;

      &__img {
        flex: 1;
        height: 100%;
      }

      &__body {
        background-color: $color-white;
        @include mediaquery-not-sm {
          width: 35%;
          min-width: 200px;
          padding: 2rem;
        }
        @include mediaquery-sm {
          max-width: 94%;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          padding: 2rem 0.5rem;
        }

        .headline {
          text-align: left;
          @include mediaquery-not-sm {
            font-size: 36px;
            margin-top: 0;
            margin-bottom: 0;
          }
          @include mediaquery-sm {
            font-size: 28px;
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      }
    }
  }

  //&--secondary-invert {
  //  .main-visual {
  //    height: 30vh;
  //    color: $color-white;
  //  }
  //}

  &--minimum {
    .l-content {
      &:before {
        display: none;
      }
    }

    .main-visual {
      background-color: $color-key2;
      display: flex;
      justify-content: center;
      align-items: center;
      @include mediaquery-not-sm {
        min-height: 24rem;
      }
      @include mediaquery-sm {
        min-height: 12rem;
      }
      //border: 1px solid $color-gray-400;
      &__body {
        .headline {
          @include mediaquery-not-sm {
            font-size: 36px;
            margin-top: 0;
            margin-bottom: 0;
          }
          @include mediaquery-sm {
            font-size: 28px;
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
