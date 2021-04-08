<template lang="pug">
.module.gallery(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .gallery__body(data-gallery="body")
     ModuleLoader(:node="itemData.value[0]")

  .gallery__thumbs
    .row
      .gallery__thumb.col-3(
        v-for="(node, index) in itemData.value",
        :class="{'-current': index == current}",
        @click="current = index"
      )
        ModuleLoader(:node="node", :key="node.id", :data-gallery="index")

  AddModuleComp(
    :itemData="itemData",
    :label="`Gallery`",
    :style="{width: '100%'}"
  )
</template>

<script lang="ts">
import {Component, Prop, Watch} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";
import AddModuleComp from "~/molle/ui/AddModuleComp.vue";

@Component({
  components: {AddModuleComp},
})
export default class Gallery extends Module {
  //@Prop({default: "Gallery"}) static__moduleId!: string;

  current = 0;
  count = 0;

  @Watch("current")
  changeIndex(after: number, before?: number) {
    let $thumb = this.$el.querySelector(`[data-gallery="${after}"]`);
    let $body = this.$el.querySelector(`[data-gallery="body"]`);
    $body!.innerHTML = $thumb!.outerHTML;
  }
}
</script>

<style lang="scss">
.gallery {
  &__body {
  }
  &__thumbs {
  }
  &__thumb {
    &-current {
    }
  }
}
</style>
