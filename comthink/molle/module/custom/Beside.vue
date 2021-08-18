<template lang="pug">
component.module.beside(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  v-isview
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
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Beside extends Module {
}

</script>

<style lang="scss">
[data-isview] {
  transition: none;

  &.-anime {
    transition-property: opacity, transform;
    transition-duration: 0.8s, 0.8s;
    transition-delay: 0.4s, 0.4s;
    transition-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
  }
}

.beside {
  width: 100%;
  height: 100%;
  margin-bottom: 3rem;
  padding-right: 10%;
  display: flex;
  @include mediaquery-not-sm {
    flex-direction: row-reverse;
  }
  @include mediaquery-sm {
    flex-direction: column-reverse;
  }

  .overlap-text-box {
    padding: 3% 3rem;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include mediaquery-not-sm {
      width: 50%;
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
    }
    @include mediaquery-sm {
      width: 100%;
    }

    .picture {
      width: 100%;
      margin-bottom: 0;

      &.picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &.-reverse {
    @include mediaquery-not-sm {
      flex-direction: row;
    }
  }
}

</style>
