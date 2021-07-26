<template lang="pug">
component.module.fade-in-out-picture-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  ul
    li
      ModuleLoader(:node="itemData.value.picture1", :key="itemData.value.id")
    li
      ModuleLoader(:node="itemData.value.picture2", :key="itemData.value.id")
    li
      ModuleLoader(:node="itemData.value.picture3", :key="itemData.value.id")

  ModuleLoader(:node="itemData.value.headline", :key="itemData.value.id")


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
.fade-in-out-picture-box {
  position: relative;
  overflow: hidden;
  height: 800px;

  ul {
    li {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 800px;
      object-fit: cover;
      list-style: none;
      visibility: hidden;
      animation: anime_slider_fade 12s 0s infinite;
    }

    li:nth-of-type(2){
      animation-delay: 4s;
    }

    li:nth-of-type(3){
      animation-delay: 8s;
    }

    @keyframes anime_slider_fade {
      0%{
        visibility: visible;
        opacity: 0;
      }
      15%{
        opacity: 1;
      }
      33.3%{
        opacity: 1;
        transform: scale(1.05);
      }
      48.3%{
        opacity: 0;
      }
      100%{
        opacity: 0;
      }
    }

    .module {
      margin: 0;
      picture img{
        object-fit: cover;
        width: 100%;
        height: 800px;
      }

    }

  }

}
</style>
