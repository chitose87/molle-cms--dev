<template lang="pug">
.module.data-set(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
)
  .data-set__headline
    span(v-html="$getText(itemData.option.text)")
  .data-set__data
    ModuleLoader(
      v-for="node in itemData.value",
      :key="node.id",
      :node="node"
    )

</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "../Module";

@Component({
  components: {},
})
export default class DataSet extends Module {
  static readonly CLASS_NAME = "DataSet";
}
</script>

<style lang="scss">
.data-set {
  margin-top: 0;
  margin-bottom: 0;
  @include mediaquery-not-sm {
    display: table-row;
  }

  &__headline, &__data {
    @include mediaquery-not-sm {
      display: table-cell;
    }
  }

  &__data {
    > *:last-child {
      margin-bottom: 0;
    }
  }
}

.data-box {
  //
  &.-border {
    border-collapse: separate;
    border-spacing: 1rem 0;

    .data-set {
      @include mediaquery-sm {
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid $color-border;
      }

      &__headline, &__data {
        position: relative;
        @include mediaquery-not-sm {
          padding-top: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid $color-border;
        }
      }

      &__headline {
        font-weight: 500;
      }

      &__data {
        @include mediaquery-sm {
          padding-left: 1rem;
        }
      }
    }
  }

  //
  &.-round {
    .data-set {
      &__headline {
        @include mediaquery-not-sm {
          padding-bottom: 2rem;
        }
        @include mediaquery-sm {
          margin-bottom: 0.5rem;
        }

        span {
          background-color: $color-blue-gray-200;
          border-radius: 1.5rem;
          text-align: center;
          min-height: 3rem;
          line-height: 1.3;
          white-space: nowrap;

          @include mediaquery-not-sm {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 2rem;
            padding-right: 2rem;
          }
          @include mediaquery-sm {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      }

      &__data {
        @include mediaquery-not-sm {
          padding-left: 2rem;
          padding-bottom: 2rem;
        }
        @include mediaquery-sm {
          margin-bottom: 1.5rem;
          //padding-left: 0.5rem;
        }
      }
    }
  }

  //
  &.c-faq {
    .data-set {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }

      @include mediaquery-not-sm {
        display: block;
      }

      &__headline, &__data {
        position: relative;

        @include mediaquery-not-sm {
          display: block;
        }

        &:before {
          position: absolute;
          margin-left: -1.5rem;
          //font-size: 20px;
          //line-height: 1;
        }

        padding-left: 1.5rem;
      }

      &__headline {
        font-weight: 600;
        margin-bottom: 0.5rem;

        &:before {
          content: "Q.";
        }
      }

      &__data {
        &:before {
          content: "A.";
        }
      }
    }
  }
}
</style>
