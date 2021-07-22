<template lang="pug">
component.module.change-picture-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .pictures
    .picture1(v-bind:class="{slideshow:setting,fadein:testflg,fadeout:!testflg}")
      ModuleLoader(:node="itemData.value[0]")

    .picture2(v-bind:class="{slideshow:setting,fadein:!testflg,fadeout:testflg}")
      ModuleLoader(:node="itemData.value[1]")

  AddModuleComp(
    :label="`CP-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
  components: {},
})
export default class ChangePictureBox extends Module {
  testflg = false;
  setting = true;

  mounted() {
    console.log("最初１",this.testflg)
    this.testflg = !this.testflg;
    console.log("最初２",this.testflg)
    setInterval(() => {
      this.testflg = !this.testflg;
      console.log("ループ",this.testflg)
    }, 60000);
  }
}

</script>

<style lang="scss">
.change-picture-box {
  //margin-top: 1rem;
  //margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  height: 500px;

  .test {
    color: red;
  }

  .test2 {
    font-size: 32px;
  }

  .pictures {

    .module {
      margin: 0;
    }

    .picture1 {
      //position: absolute;
      //top: 100px;
      //left: 0;
      width: 100%;
      height: 100%;
      //height: 500px;

    }

    .picture2 {
      //position: absolute;
      //top: 100px;
      //left: 0;
      width: 100%;
      height: 100%;
      //height: 500px;

    }

    .slideshow {
      position: absolute;
      top: 0;
      left: 0;
    }

    .fadein {
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      //width: 100%;
      //height: 100%;
      opacity: 1;
      transform: scale(1.05);
      transition:opacity 3000ms,transform 6000ms;
    }

    .fadeout {
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      //width: 100%;
      //height: 100%;
      opacity: 0;
      transform: scale(1);
      transition:opacity 1000ms,transform 6000ms,easeInQuart;
    }

  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  //thema
  &.-quote {
    background-color: $color-gray-100;
    padding: 2rem 1rem;
    position: relative;

    &:before,
    &::after {
      position: absolute;
      font-size: 200%;
      line-height: 1;
    }

    &::before {
      content: "“";
      left: 0.5rem;
      top: 1rem;
    }

    &::after {
      content: "”";
      right: 0.5rem;
      bottom: 0rem;
    }
  }

  // color
  &.-gray {
    background-color: $color-gray-600;
    @include mediaquery-not-sm {
      padding-top: $gutter*2;
      padding-bottom: $gutter*2;
    }
    @include mediaquery-sm {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  }

  &.-gray-box {
    border: 6px solid $color-border-light;
    padding: 1.5rem;
    background-color: $color-white;
    @include mediaquery-sm {
      padding: 1rem;
    }
  }

  &.-dark {
    background-color: $color-black;
    color: $color-text-white;
    padding-top: $gutter*2;
    padding-bottom: $gutter*2;
  }
}
</style>
