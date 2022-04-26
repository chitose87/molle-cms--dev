<template lang="pug">
  .scroll-trans-fiexd-bg(
    :data-css="opt.flag?'kou':'otu'"
    :data-mesh="opt.mesh"
  )
    // kou
    .scroll-trans-fiexd-bg__kou(v-show="opt.kou" :style="`transform-origin: ${opt.kou.v}% ${opt.kou.h}%`")
      picture
        source(
          v-if="opt.kou.sp"
          :media="`(max-width:${breakPoint - 1}px)`"
          :srcset="opt.kou.sp",
          :alt="opt.kou.alt"
        )
        img(
          :src="opt.kou.value",
          :alt="opt.kou.alt"
        )

    // otu
    .scroll-trans-fiexd-bg__otu(v-show="opt.otu" :style="`transform-origin: ${opt.otu.v}% ${opt.otu.h}%`")
      picture
        source(
          v-if="opt.otu.sp"
          :media="`(max-width:${breakPoint - 1}px)`"
          :srcset="opt.otu.sp",
          :alt="opt.otu.alt"
        )
        img(
          :src="opt.otu.value",
          :alt="opt.otu.alt")

    // loading
    .scroll-trans-fiexd-bg__next(v-if="opt.next")
      picture
        source(
          v-if="opt.next.sp"
          :media="`(max-width:${breakPoint - 1}px)`"
          :srcset="opt.next.sp",
        )
        img(:src="opt.next.value")

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
    current: <any>false,
    next: <any>false,
    kou: <any>false,
    otu: <any>false,
    flag: true,
    mesh: true,
  };
  lock = false;

  mounted() {
    requestAnimationFrame(() => {
      window.addEventListener("scroll", (e: Event) => this.onScroll());
      this.onScroll();
      this.$set(this, "lock", false);
    });
  }

  // transitionend() {
  //   console.log("transitionend");
  //   this.$set(this, "lock", false);
  //
  //   this.onScroll();
  // }

  private onScroll() {
    let poji = Number.MAX_VALUE;
    let nega = poji * -1;
    let next = false;
    let current: any;

    // console.log("----")
    document.querySelectorAll(".scroll-trans-anchor")
      .forEach((anchor: any) => {
        let rect = anchor.getBoundingClientRect();
        let _v = rect.top - (window.outerHeight / 2);
        // console.log(_v)
        if (_v > 0) {
          if (poji > _v) {
            poji = _v;
            next = anchor;
          }
        } else {
          if (nega < _v) {
            nega = _v;
            current = anchor;
          }
        }
      });
    // console.log(current);

    if (!current) return;
    let v = {
      value: current.getAttribute("data-value"),
      sp: current.getAttribute("data-sp"),
      alt: current.getAttribute("data-alt"),
      v: current.getAttribute("data-v"),
      h: current.getAttribute("data-h"),
    };
    if (!v.v && v.v !== 0) v.v = 50;
    if (!v.h && v.h !== 0) v.h = 50;
    // console.log(this.lock, this.opt.current != v.value, this.opt.flag);
    if (!this.lock && this.opt.current != v.value) {
      // console.log("---");
      if (this.opt.flag) {
        this.$set(this.opt, "otu", v);
      } else {
        this.$set(this.opt, "kou", v);
      }
      this.$set(this.opt, "current", v.value);
      this.$set(this.opt, "mesh", current.className.includes("mesh-none"));

      this.$set(this, "lock", true);
      this.$set(this.opt, "flag", !this.opt.flag);
      this.$set(this.opt, "next", next);//loading
      this.$set(this.opt, "status", "change");

      setTimeout(() => {
        this.$set(this, "lock", false);
        this.onScroll();
      }, 1000 * 2);
    }
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
  opacity: 0.5;
  transition: opacity 1s $easeInOut 0s;

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url("/img/pattern.png");
    background-repeat: repeat;
    background-size: 11px auto;
    opacity: 0.5;
    z-index: 1;
    transition: opacity 1s $easeInOut 0s;
  }

  &[data-mesh="true"] {
    opacity: 1;

    &:before {
      opacity: 0;
    }
  }

  &__kou, &__otu {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 2s $easeInOut 0s;
    animation: 60s linear 0s infinite alternate hoge;

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

  @keyframes hoge {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.4);
    }
  }

  &[data-css="kou"] {
    .scroll-trans-fiexd-bg {
      &__kou {
      }

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

      &__otu {
      }
    }
  }
}
</style>
