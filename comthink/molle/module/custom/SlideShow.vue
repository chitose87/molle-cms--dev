<template lang="pug">
component.module.slide-show(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ModuleLoader(:node="itemData.value.headline", :key="itemData.value.headline.id")

  ul
    li
      ModuleLoader(:node="itemData.value.img1", :key="itemData.value.img1.id")
    li
      ModuleLoader(:node="itemData.value.img2", :key="itemData.value.img2.id")
    li
      ModuleLoader(:node="itemData.value.img3", :key="itemData.value.img3.id")


</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class SlideShow extends Module {
  static readonly CLASS_NAME = "SlideShow";
}

</script>

<style lang="scss">

.module {

  .slide-show {
    margin-top: -5.5rem;
    position: relative;
    overflow: hidden;
    min-height: 100vh;

    .headline {
      position: absolute;
      top: 48%;
      right: 10%;
      z-index: 1;
      font-size: 4.1vw;
      line-height: 130%;
    }

    ul {
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .module {
        height: 100%;
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;

        picture img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      li {
        position: absolute;
        left: 100%;
        width: inherit;
        height: inherit;
        object-fit: cover;
        animation: slideAnime 12s ease infinite;
      }

      li:nth-of-type(1) {
        animation-delay: 0s;
      }

      li:nth-of-type(2) {
        animation-delay: 4s;
      }

      li:nth-of-type(3) {
        animation-delay: 8s;
      }

      @keyframes slideAnime {
        0% {
          left: 100%;
        }
        6% {
          left: 0;
        }
        33.3333% {
          left: 0;
        }
        39.3333% {
          left: -100%;
        }
        100% {
          left: -100%;
        }
      }

    }
  }

  .-fade {
    ul {
      li {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        list-style: none;
        visibility: hidden;
        animation: anime_slider_fade 12s 0s infinite;
      }

      li:nth-of-type(2) {
        animation-delay: 4s;
      }

      li:nth-of-type(3) {
        animation-delay: 8s;
      }

      @keyframes anime_slider_fade {
        0% {
          visibility: visible;
          opacity: 0;
        }
        15% {
          opacity: 1;
        }
        33.3333% {
          opacity: 1;
          transform: scale(1.05);
        }
        48.3333% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
      }
    }
  }


}
</style>
