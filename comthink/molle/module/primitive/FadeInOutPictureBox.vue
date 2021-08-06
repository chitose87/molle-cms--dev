<template lang="pug">
component.module.fade-in-out-picture-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ul
    li
      ModuleLoader(:node="itemData.value.img1", :key="itemData.value.img1.id")
    li
      ModuleLoader(:node="itemData.value.img2", :key="itemData.value.img2.id")
    li
      ModuleLoader(:node="itemData.value.img3", :key="itemData.value.img3.id")

  ModuleLoader(:node="itemData.value.headline", :key="itemData.value.headline.id")


</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class FadeInOutPictureBox extends Module {
}

</script>

<style lang="scss">
.module{
  margin-top: 0;

  .fade-in-out-picture-box {
    position: relative;
    overflow: hidden;
    height: 100vh;

    ul {
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

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
        33.3% {
          opacity: 1;
          transform: scale(1.05);
        }
        48.3% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
      }

      .module {
        height: 100%;
        width: 100%;

        picture img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

      }

    }
  }

}
</style>
