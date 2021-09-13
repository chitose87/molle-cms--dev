<template lang="pug">
.module.dev-module-guide(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  h3.dev-module-guide__headline
    span(v-html="itemData.option.module")

  .column
    .column__item.col-3
      .dev-module-guide__left
        .dev-module-guide__permission(
          v-if="itemData.option.module"
          v-for="permission in [$molleModules[itemData.option.module].profile.stylePermission]"
        )
          dl(v-if="permission.theme!==undefined")
            dt {{$words.theme}}
            dd
              span(v-for="theme in permission.theme.select" v-html="theme")

          dl(v-if="permission.color!==undefined")
            dt {{$words.color}}
            dd
              span(v-for="color in permission.color.select" v-html="color")

          //section
          dl(v-if="permission.section!==undefined")
            dt {{$words.section}}
            dd
              span {{$words.default}}({{$words.TF(permission.section)}})

          //container
          dl(v-if="permission.container!==undefined")
            dt {{$words.container}}
            dd
              span {{$words.default}}({{$words.TF(permission.container)}})

          //container-fluid
          dl(v-if="permission['container-fluid']!==undefined")
            dt {{$words.container}}-{{$words.fluid}}
            dd
              span {{$words.default}}({{$words.TF(permission["container-fluid"])}})

          //Border
          dl(v-if="permission.border!==undefined")
            dt {{$words.border}}
            dd
              span {{$words.default}}({{$words.TF(permission.border)}})

          //TextHorizontal
          dl(v-if="permission.align!==undefined")
            dt {{$words.align}}
            dd
              span(v-for="item in styleAlign" :value="item.value" v-html="$words[item.label]")
        hr
        p(v-html="itemData.option.memo")
    .column__item.col
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

@Component({
  components: {},
})
export default class DevModuleGuide extends Module {
  static readonly CLASS_NAME = "DevModuleGuide";

  mounted() {

  }
}
</script>

<style lang="scss">
.dev-module-guide {
  border: 1px solid $color-border;
  padding: 1rem;

  &__left {
    border-right: 1px solid $color-border;
  }

  &__headline {
    margin-top: 0;
    border-bottom: 1px solid $color-border;
  }

  &__permission {
    dl {
      dt {
        display: inline-block;

        &:after {
          content: ":";
          margin-left: 0.5em;
          margin-right: 0.5em;
        }
      }

      dd {
        display: inline-block;
      }
    }
  }
}
</style>
