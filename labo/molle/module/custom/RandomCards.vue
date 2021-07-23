<template lang="pug">
.module.random-cards(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  p(
    v-html="itemData.option.text || ''"
  )

  .column.column-col-6
    ModuleLoader(v-for="node in itemData.value", :key="node.id", :node="node")

    p $route.query.edit / {{$route.query.edit}}
    p $root.$isServer / {{$root.$isServer}}
    p isMolleCms / {{isMolleCms}}

    //AddModuleComp.col-12(
    //  :itemData="itemData",
    //
    //
    //)
    AddModuleComp.col-12(
      :label="``",
      :parentNode="loader.node"
      :style="{width: '100%'}"
    )
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class RandomCards extends Module {

  isMolleCms = process.env.isMolleCms;

  //Unique Methods
  getClass(data: any) {
    let obj = super.getClass(this.itemData);
    if (!this.$route.query.edit) {
      obj["--playable"] = true;
    }
    return obj;
  }
}
</script>

<style lang="scss">
.random-cards {

  &--playable {

  }
}
</style>
