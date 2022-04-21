<template lang="pug">
.molle-comment-view
  .molle-comment-view__batch(
    v-for="(item,id) in list"
    v-if="item && item.count>0"
    :style="{transform:`translate(${item.x}px, ${item.y}px)`}"
    :key="id"
    :title="id"
  )
    span(v-html="item.count" v-if="item.count>1")
    b-icon(icon="chat-right-fill")
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import ModuleLoaderCms from "../module/ModuleLoaderCms.vue";

@Component({
  components: {},
})
export default class MolleCommentView extends Vue {
  list: any = {};

  mounted() {
    this.enterframe();
  }

  private enterframe() {
    for (let id in ModuleLoaderCms.modules) {
      let loader = ModuleLoaderCms.modules[id];

      if (loader.itemData.comment && Object.keys(loader.itemData.comment).length > 0) {
        let ele = <HTMLElement>loader.$el;
        let obj = {
          y: ele.offsetTop,
          x: ele.offsetLeft,
          count: Object.keys(loader.itemData.comment).length,
        };

        if (!this.list[id]
          || obj.x != this.list[id].x
          || obj.y != this.list[id].y
          || obj.count != this.list[id].count
        ) {
          this.$set(this.list, id, obj);
        }
      } else if (this.list[id]) {
        this.list[id].count = 0;
      }
    }
    requestAnimationFrame(this.enterframe);
  }
}
</script>

<style lang="scss">
.l-body {
  position: relative;
}

.molle-comment-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $zindex-modal - 1;
  pointer-events: none;

  &__batch {
    position: absolute;
    //pointer-events: visible;
    cursor: pointer;
    font-size: 40px;
    color: $color-red;

    span {
      color: $color-white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      font-size: 20px;
      line-height: 1;
      font-weight: bolder;
    }
  }
}
</style>
