<template lang="pug">
component.module.headline(
  :id="itemData.tagId",
  :is="itemData.option.lv || 'h3'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  span(v-html="itemData.value || itemData.superValue || ''")
  span.headline__sub(
    v-if="itemData.option.text",
    v-html="itemData.option.text"
  )
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class Headline extends Module {
  static readonly CLASS_NAME = "Headline";
  @Prop() static__value?: string;
}
</script>

<style lang="scss">
.headline {
  &.text-white {
    color: $color-text-white;
  }
  &__sub {
    display: block;
    font-size: 75%;
  }
}

h3.headline {
  &.decorate {
    position: relative;
    margin: 0;
    border-bottom: solid 1px $color-text;
    @include mediaquery-not-sm {
      font-size: 25px;
      margin-top: 2rem;
      margin-bottom: 3.5rem;
    }
    @include mediaquery-sm {
      font-size: 24px;
      margin-top: 2rem; //?
      margin-bottom: 3.5rem; //?
    }

    &.text-white {
      &:before {
        filter: brightness(2);
      }
    }
  }
}

h4.headline {
  &.decorate {
    font-size: 21px;
    border-bottom: solid 1px $color-text;
  }
}
</style>
