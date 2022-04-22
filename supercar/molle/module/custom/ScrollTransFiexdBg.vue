<template lang="pug">
  .scroll-trans-fiexd-bg(:data-css="opt.flag?'kou':'otu'" )
    // kou
    .scroll-trans-fiexd-bg__kou(v-for="anchor in [anchors[opt.kou]]" v-if="anchor" @transitionend="transitionend")
      picture
        source(
          v-if="anchor.itemData.option.sp"
          :media="`(max-width:${breakPoint - 1}px)`"
          :srcset="anchor.itemData.option.sp",
          :width="anchor.itemData.option.spSize?anchor.itemData.option.spSize.w/(anchor.itemData.option.scale||1)+'px':'auto'"
          :height="anchor.itemData.option.spSize?anchor.itemData.option.spSize.h/(anchor.itemData.option.scale||1)+'px':'auto'"
          :alt="anchor.itemData.option.alt"
        )
        img(
          :src="anchor.itemData.value",
          :width="anchor.itemData.option.size?anchor.itemData.option.size.w/(anchor.itemData.option.scale||1)+'px':'auto'"
          :height="anchor.itemData.option.size?anchor.itemData.option.size.h/(anchor.itemData.option.scale||1)+'px':'auto'"
          :alt="anchor.itemData.option.alt")

    // otu
    .scroll-trans-fiexd-bg__otu(v-for="anchor in [anchors[opt.otu]]" v-if="anchor" @transitionend="transitionend")
      picture
        source(
          v-if="anchor.itemData.option.sp"
          :media="`(max-width:${breakPoint - 1}px)`"
          :srcset="anchor.itemData.option.sp",
          :width="anchor.itemData.option.spSize?anchor.itemData.option.spSize.w/(anchor.itemData.option.scale||1)+'px':'auto'"
          :height="anchor.itemData.option.spSize?anchor.itemData.option.spSize.h/(anchor.itemData.option.scale||1)+'px':'auto'"
          :alt="anchor.itemData.option.alt"
        )
        img(
          :src="anchor.itemData.value",
          :width="anchor.itemData.option.size?anchor.itemData.option.size.w/(anchor.itemData.option.scale||1)+'px':'auto'"
          :height="anchor.itemData.option.size?anchor.itemData.option.size.h/(anchor.itemData.option.scale||1)+'px':'auto'"
          :alt="anchor.itemData.option.alt")

    // loading
    .scroll-trans-fiexd-bg__next(v-for="anchor in [anchors[opt.next]]" v-if="anchor")
      picture
        source(
          v-if="anchor.itemData.option.sp"
          :media="`(max-width:${breakPoint - 1}px)`"
          :srcset="anchor.itemData.option.sp",
        )
        img(:src="anchor.itemData.value")

</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";
import ScrollTransAnchor from "./ScrollTransAnchor.vue";

@Component({
  components: {},
})
export default class ScrollTransFiexdBg extends Module {
  static readonly CLASS_NAME = "ScrollTransFiexdBg";
  breakPoint = process.env.breakPoint;
  static anchors: ScrollTransAnchor[] = [];
  anchors = ScrollTransFiexdBg.anchors;

  opt = {
    status: "none",
    current: 0,
    next: 0,
    kou: 0,
    otu: 0,
    flag: true,
  };
  lock = false;

  mounted() {
    requestAnimationFrame(() => this.init());
  }

  transitionend() {
    this.lock = false;
  }

  private init() {
    window.addEventListener("scroll", (e: Event) => {
      let poji = Number.MAX_VALUE;
      let nega = poji * -1;
      let next = 1;
      let current = 0;
      this.anchors.forEach((anchor: ScrollTransAnchor, i: number) => {
        let el = anchor.$el;
        let rect = el.getBoundingClientRect();
        let _v = rect.top - (window.outerHeight / 2);
        if (_v > 0) {
          if (poji > _v) {
            poji = _v;
            next = i;
          }
        } else {
          if (nega < _v) {
            nega = _v;
            current = i;
          }
        }
      });
      // console.log(current);

      if (!this.lock && this.opt.current != current) {

        if (this.opt.flag) {
          this.$set(this.opt, "otu", current);
        } else {
          this.$set(this.opt, "kou", current);
        }
        this.opt.current = current;

        this.lock = true;
        this.$set(this.opt, "flag", !this.opt.flag);
        this.$set(this.opt, "next", next);//loading
        this.$set(this.opt, "status", "change");
      }
    });
  }
}
</script>

<style lang="scss">
.scroll-trans-fiexd-bg {
  pointer-events: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;

  &__kou, &__otu {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 2s $easeInOut 0s;
    opacity: 0.6;

    img {
      object-fit: cover;
      object-position: center center;
      width: 100%;
      height: 100%;
    }
  }

  &__next {
    position: absolute;
    visibility: hidden;
  }

  &[data-css="kou"] {
    .scroll-trans-fiexd-bg {
      &__otu {
        opacity: 0;
      }
    }
  }

  &[data-css="otu"] {
    .scroll-trans-fiexd-bg {
      &__kou {
        opacity: 0;
      }
    }
  }
}
</style>
