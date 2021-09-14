<template lang="pug">
.module.dev-module-guide(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .dev-module-guide__headline
    h3
      span(v-html="itemData.option.module")
      | /
      span(v-html="$molleModules[itemData.option.module].profile.LANGS[$lang]")
    p(v-if="itemData.option.description" v-html="itemData.option.description")

  .row
    .col-3
      .dev-module-guide__left
        .dev-module-guide__permission(
          v-if="itemData.option.module"
          v-for="permission in [$molleModules[itemData.option.module].profile.stylePermission]"
        )
          dl(v-if="permission.theme!==undefined")
            dt {{$words.theme}}
            dd
              span.dev-module-guide__permission__option(
                v-for="theme in permission.theme.select"
                :data-default="theme==permission.theme.default"
              )
                span {{theme || "\" \""}}

          dl(v-if="permission.color!==undefined")
            dt {{$words.color}}
            dd
              span.dev-module-guide__permission__option(
                v-for="color in permission.color.select"
                :data-default="color==permission.color.default"
              )
                span {{color || "\" \""}}

          //section
          dl(v-if="permission.section!==undefined")
            dt {{$words.section}}
            dd
              span.dev-module-guide__permission__option(:data-default="permission.section") {{$words.true}}
              span.dev-module-guide__permission__option(:data-default="!permission.section") {{$words.false}}

          //container
          dl(v-if="permission.container!==undefined")
            dt {{$words.container}}
            dd
              span.dev-module-guide__permission__option(:data-default="permission.container") {{$words.true}}
              span.dev-module-guide__permission__option(:data-default="!permission.container") {{$words.false}}

          //container-fluid
          dl(v-if="permission['container-fluid']!==undefined")
            dt {{$words.container}}-{{$words.fluid}}
            dd
              span.dev-module-guide__permission__option(:data-default="permission['container-fluid']") {{$words.true}}
              span.dev-module-guide__permission__option(:data-default="!permission['container-fluid']") {{$words.false}}

          //Border
          dl(v-if="permission.border!==undefined")
            dt {{$words.border}}
            dd
              span.dev-module-guide__permission__option(:data-default="permission.border") {{$words.true}}
              span.dev-module-guide__permission__option(:data-default="!permission.border") {{$words.false}}

          //TextHorizontal
          dl(v-if="permission.align!==undefined")
            dt {{$words.align}}
            dd
              span.dev-module-guide__permission__option(
                v-for="item in styleAlign"
                :data-default="item.value==''"
              )
                span {{$words[item.label] || "\" \""}}
        hr
        p(v-html="itemData.option.memo")
    .col
      .dev-module-guide__right
        .container

          ModuleLoader(
            v-for="node in itemData.value",
            :key="node.id",
            :node="node"
          )

          AddModuleComp(
            :label="`DevModuleGuide`"
            :parentNode="loader.node"
          )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";
import {StyleAlign} from "~/molle-cms/src/Singleton";

@Component({
  components: {},
})
export default class DevModuleGuide extends Module {
  static readonly CLASS_NAME = "DevModuleGuide";
  styleAlign = StyleAlign;

  mounted() {

  }
}
</script>

<style lang="scss">
.dev-module-guide {
  border: 1px solid $color-border;
  padding: 1rem;

  &__left {
  }

  &__right {
    border: 1px solid $color-border-light;
  }

  &__headline {
    margin-bottom: 2rem;

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid $color-border;
    }

    p {
    }
  }

  &__permission {
    [data-default] {
      border-bottom: 1px solid $color-border;
    }

    dl {
      dt {
        display: inline-block;
        margin-right: -1rem;

        &:after {
          content: ":";
          margin-left: 0.5em;
          margin-right: 0.5em;
        }
      }

      dd {
        display: inline-block;
        margin-left: 1rem;
      }
    }

    &__option {
      display: inline-block;
      position: relative;
      margin-right: 1rem;

      &:after {
        position: absolute;
        content: "|";
        right: -0.75rem;
      }

      &:last-child {
        margin-right: 0;

        &:after {
          display: none;
        }
      }
    }
  }
}
</style>
