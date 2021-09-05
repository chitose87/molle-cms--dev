<template lang="pug">
component.module.feature-box(
  :is="itemData.option.tag||'div'",
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .module.headline.h3
    span(v-html="itemData.option.title || itemData.superValue || ''")

  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`FeatureBox`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class FeatureBox extends Module {
  static readonly CLASS_NAME = "FeatureBox";
}
</script>

<style lang="scss">
.feature-box {

  > .headline {
    position: relative;

    &:before {
      content: "";
      display: block;
      height: 1px;
      background: #000;
      position: absolute;
      top: 50%;
      left: -2%;
      transform: translate3d(-100%, 0, 0);
      width: 5%;
    }
  }

  padding: 3.9%;
  margin-left: 7%;
  background-color: rgba(164, 164, 164, 0.3);
  @include mediaquery-sm {
    margin-right: 7%;
  }

  > div:nth-child(2n+1) {
    .overlap-text-box {
      @include mediaquery-not-sm {
        margin-left: 10%;
      }
    }

    .overlap-img {
      @include mediaquery-not-sm {
        margin-left: 33%;
      }
    }
  }

  &.-sub {
    > div:nth-child(2n+1) {
      .overlap-text-box {
        @include mediaquery-not-sm {
          margin: 0;
        }
      }

      .overlap-img {
        @include mediaquery-not-sm {
          margin: 0;
        }
      }
    }
  }

  &.-sub {
    &.-right {
      padding: 3.9% 3.9% 3.9% 10.9%;
      margin-left: 0;
      background: linear-gradient(to right, #ffffff 0%, #ffffff 65%, rgba(164, 164, 164, 0.3) 65%, rgba(164, 164, 164, 0.3) 93%, #ffffff 93%, #ffffff 100%);
      @include mediaquery-sm {
        padding: 3.9%;
        margin-right: 7%;
        margin-left: 7%;
        background: linear-gradient(to right, #ffffff 0%, #ffffff 50%, rgba(164, 164, 164, 0.3) 50%, rgba(164, 164, 164, 0.3) 100%);
      }
    }

    &.-left {
      padding: 3.9%;
      margin-left: 7%;
      background: linear-gradient(to right, rgba(164, 164, 164, 0.3) 0%, rgba(164, 164, 164, 0.3) 35%, #ffffff 35%, #ffffff 100%);
      @include mediaquery-sm {
        padding: 3.9%;
        margin-right: 7%;
        margin-left: 7%;
        background: linear-gradient(to right, rgba(164, 164, 164, 0.3) 0%, rgba(164, 164, 164, 0.3) 50%, #ffffff 50%, #ffffff 100%);
      }
    }

    //feature
    .feature {
      height: 100%;
      padding-right: 10%;
      display: flex;
      @include mediaquery-not-sm {
        flex-direction: row-reverse;
      }
      @include mediaquery-sm {
        flex-direction: column-reverse;
      }
      position: static;

      .overlap-text-box {
        margin: 0;

        @include mediaquery-not-sm {
          position: static;
        }
      }

      .overlap-img {

        @include mediaquery-not-sm {
          position: static;
          margin: 0;
          width: 50%;
        }

        .picture {
          margin-bottom: 0;

          &.picture img {
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    &.-right {
      //feature
      .feature {
        @include mediaquery-not-sm {
          flex-direction: row;
        }
      }
    }
  }

  &.feature-box {
    margin-bottom: 10rem;
  }
}

</style>
