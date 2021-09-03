<template lang="pug">
component.module.feature(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
)

  div.overlap-text-box
    ModuleLoader(:node="itemData.value.headline" :key="itemData.value.headline.id")
    ModuleLoader(:node="itemData.value.text" :key="itemData.value.text.id")
    ModuleLoader(:node="itemData.value.btn" :key="itemData.value.btn.id")
  div.overlap-img
    ModuleLoader(:node="itemData.value.img" :key="itemData.value.img.id")

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Feature extends Module {
}
</script>

<style lang="scss">
.feature {
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column-reverse;
  position: relative;

  .overlap-text-box {
    z-index: 1;
    padding: 3% 3rem;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include mediaquery-not-sm {
      width: 50%;
      height: 100%;
      min-height: 300px;
      position: relative;
      margin-top: 7%;
      margin-left: 33%;
    }
    @include mediaquery-sm {
      width: 100%;
    }

    .module {
      margin-bottom: 1rem;
    }

    .button {
      justify-content: flex-end;
    }
  }

  .overlap-img {
    display: flex;

    @include mediaquery-not-sm {
      width: 50%;
      margin-left: 10%;
      position: absolute;
      top: 0;
      left: 0;
    }
    @include mediaquery-sm {
      width: 100%;
    }

    .picture {
      width: 100%;

      &.picture img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
