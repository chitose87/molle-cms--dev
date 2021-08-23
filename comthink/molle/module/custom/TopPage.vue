<template lang="pug">
component.module.top-page(
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
    :label="`MC-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class TopPage extends Module {
}
</script>

<style lang="scss">
.top-page {

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

  //content
  .content {
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

    //content
    .content {
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
      .content {
        @include mediaquery-not-sm {
          flex-direction: row;
        }
      }
    }
  }
}

.module {
  &.top-page {
    margin-bottom: 10rem;
  }
}

</style>
