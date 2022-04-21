<template lang="pug">
component.headline(
  :id="itemData.tagId",
  :is="itemData.option.lv || 'h3'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  span(v-html="$getText(itemData.value || itemData.superValue || '')")
  span.headline__sub(
    v-if="itemData.option.text",
    v-html="$getText(itemData.option.text)"
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
  word-break: keep-all;

  &.text-white {
    color: $color-text-white;
  }

  &__sub {
    display: block;
    font-weight: 400;
    letter-spacing: 0em;
    line-height: 1.4;
    word-break: keep-all;
  }
}

h6.headline {
  &.decorate, &.decorate-white {
    margin-bottom: 3rem;

    span {
      display: inline-block;
      border-bottom: solid 1px $color-border;
    }
  }
}

h1 > .headline__sub {
  font-size: 32px;
  margin-top: 1rem;
}

h2 > .headline__sub {
  font-size: 28px;
  margin-top: 1rem;
}

h3 {
  &.headline {
    &.decorate, &.decorate-white {
      margin-bottom: 3rem;

      span {
        display: inline-block;
        position: relative;
        z-index: 0;

        &:after {
          content: "";
          display: block;
          width: 100%;
          height: 15px;
          background-color: #dfecf0;
          //background-color: $color-blue-gray-200;
          position: absolute;
          bottom: 0px;
          z-index: -1;
        }
      }

      .headline__sub {
        display: block;

        &:after {
          display: none;
        }
      }
    }

    &.decorate-white {
      span {
        &:after {
          background-color: $color-white;
        }
      }
    }
  }

  > .headline__sub {
    font-size: 24px;
    margin-top: 1rem;
  }
}

//
h4 {
  &.headline {
    &.decorate, &.decorate-white {
      margin-bottom: 2.5rem;

      span {
        display: block;

        &:first-child {
          &:after {
            content: "";
            display: block;
            width: 3rem;
            height: 4px;
            margin-right: auto;
            border-radius: 2px;
            background-color: $color-text;
            line-height: 0;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
          }

        }
      }

      &.text-center {
        span:first-child:after {
          margin-left: auto;
        }
      }
    }
  }

  > .headline__sub {
    font-size: 18px;
    margin-top: 0.5rem;
    line-height: 1.35;

    > span {
    }
  }
}

//
h5 {
  &.headline {
    &.decorate, &.decorate-white {
      margin-bottom: 2rem;

      span {
      }

      &:before {
        content: "";
        display: inline-block;
        width: 5px;
        height: 1.1em;
        background-color: $color-text;
        vertical-align: middle;
        margin-right: 0.5em;
        margin-top: -5px;
      }
    }
  }

  > .headline__sub {
    font-size: 16px;
    //font-weight: 300;
    margin-top: 0.5rem;
    line-height: 1.35;
  }
}

h6 > .headline__sub {
  font-size: 16px;
  //font-weight: 400;
  //  margin-top: 1.5rem;
}

</style>
