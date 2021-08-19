<template lang="pug">
a.module.link-box(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)",
  :href="$route.query.edit ? 'javascript:void(0)' : itemData.option.href"
  :target="itemData.option.target"
)
  ModuleLoader(
    v-for="node in itemData.value",
    :key="node.id",
    :node="node"
  )

  AddModuleComp(
    :label="`Link-Box`"
    :parentNode="loader.node"
  )
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class LinkBox extends Module {
}
</script>

<style lang="scss">
.link-box {
  display: block;

  //> *:first-child {
  //  margin-top: 0;
  //}
  //
  //> *:last-child {
  //  margin-bottom: 0;
  //}
  //
  ////thema
  //&.-quote {
  //  background-color: $color-gray-100;
  //  padding: 2rem 1rem;
  //  position: relative;
  //
  //  &:before,
  //  &::after {
  //    position: absolute;
  //    font-size: 200%;
  //    line-height: 1;
  //  }
  //
  //  &::before {
  //    content: "“";
  //    left: 0.5rem;
  //    top: 1rem;
  //  }
  //
  //  &::after {
  //    content: "”";
  //    right: 0.5rem;
  //    bottom: 0rem;
  //  }
  //}
  //
  //&.-overlay {
  //  background-color: rgba(164, 164, 164, 0.3);
  //  position: relative;
  //  z-index: 10;
  //  @include mediaquery-not-sm {
  //    margin: -$gutter*2.5 7% $gutter*2;
  //    padding-top: $gutter*2;
  //    padding-bottom: $gutter*2;
  //
  //  }
  //  @include mediaquery-sm {
  //    padding-top: 3rem;
  //    padding-bottom: 3rem;
  //  }
  //}
  //
  //&.-right {
  //  margin-left: 7%;
  //  margin-bottom: 8rem;
  //  padding: 3.9%;
  //  background-color: rgba(164, 164, 164, 0.3);
  //}
  //
  //&.-left {
  //  margin-bottom: 8rem;
  //  padding: 3.9% 3.9% 3.9% 10.9%;
  //  background: linear-gradient(to right, rgba(164, 164, 164, 0.3) 0%, rgba(164, 164, 164, 0.3) 93%, #ffffff 93%, #ffffff 100%);
  //}
  //
  //&.-sm-right {
  //  //margin-left: 7%;
  //  //padding: 3.9%;
  //  padding: 3.9% 3.9% 3.9% 10.9%;
  //  margin-bottom: 8rem;
  //  background: linear-gradient(to right, #ffffff 0%, #ffffff 65%, rgba(164, 164, 164, 0.3) 65%, rgba(164, 164, 164, 0.3) 93%, #ffffff 93%, #ffffff 100%,);
  //}
  //
  //&.-sm-left {
  //  margin-left: 7%;
  //  padding: 3.9%;
  //  margin-bottom: 8rem;
  //  background: linear-gradient(to right, rgba(164, 164, 164, 0.3) 0%, rgba(164, 164, 164, 0.3) 35%, #ffffff 35%, #ffffff 100%);
  //}
  //
  //// color
  //&.-gray {
  //  background-color: $color-gray-600;
  //  @include mediaquery-not-sm {
  //    padding-top: $gutter*2;
  //    padding-bottom: $gutter*2;
  //  }
  //  @include mediaquery-sm {
  //    padding-top: 3rem;
  //    padding-bottom: 3rem;
  //  }
  //}
  //
  //&.-gray-box {
  //  border: 6px solid $color-border-light;
  //  padding: 1.5rem;
  //  background-color: $color-white;
  //  @include mediaquery-sm {
  //    padding: 1rem;
  //  }
  //}
  //
  //&.-dark {
  //  background-color: $color-black;
  //  color: $color-text-white;
  //  padding-top: $gutter*2;
  //  padding-bottom: $gutter*2;
  //}
}
</style>
