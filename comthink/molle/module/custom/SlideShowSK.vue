<template lang="pug">
component.module.slide-show-s-k(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .heading
    ModuleLoader(:node="itemData.value.headline", :key="itemData.value.headline.id")

  .images
    ul
      li
        ModuleLoader(:node="itemData.value.img1", :key="itemData.value.img1.id")
      li
        ModuleLoader(:node="itemData.value.img2", :key="itemData.value.img2.id")
      li
        ModuleLoader(:node="itemData.value.img3", :key="itemData.value.img3.id")

  .scroll
    picture
      source(
        :media="`(max-width:${breakPoint - 1}px)`"
        :alt="''"
      )
      img(:src="'https://storage.googleapis.com/molle-cms---dev.appspot.com/comthink/mouse999.png'", :alt="itemData.option.alt")

    .module.paragraph.-caption
      span スクロール

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class SlideShowSK extends Module {
}

</script>

<style lang="scss">

.module {

  .slide-show-s-k {
    position: relative;
    width: 100%;
    height: 100%;

    .heading {
      position: absolute;
      z-index: 1;
      margin: 0;
      width: 100%;
      padding: 0 11.25rem 6rem 11.25rem;
      height: 100%;
      min-width: 920px;

      .headline {
        margin: -3.2rem -3.6rem auto auto;
        padding: 2rem;
        line-height: 130%;
        font-weight: bold;
        writing-mode: vertical-rl;
        text-orientation: upright;
      }
    }

    > .images {
      position: relative;
      overflow: hidden;
      padding: 0 11.25rem 6rem 11.25rem;
      margin-bottom: 6rem;
      min-height: 84vh;
      min-width: 920px;
      box-sizing: border-box;

      ul {
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0 11.25rem 6rem 11.25rem;

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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 0 11.25rem 6rem 11.25rem;
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

    .scroll {
      position: absolute;
      width: 100%;
      min-width: 920px;
      bottom: -2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #777;
      font-family: HGP行書体;

      picture {
        img {
          width: 2rem;
          margin-bottom: 0.5rem;
        }
      }

    }
  }
}
</style>
