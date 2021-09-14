<template lang="pug">
.module.social-share(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  button.social-share__item.social-share--facebook(
    v-if="!itemData.option.noFacebook",
    @click="shareFb",
    aria-label="Facebookシェア"
  )
  button.social-share__item.social-share--twitter(
    v-if="!itemData.option.noTwitter",
    @click="shareTw",
    aria-label="Teitterシェア"
  )
</template>

<script lang="ts">
import {Component, Prop, Watch} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class SocialShare extends Module {
  static readonly CLASS_NAME = "SocialShare";
  shareFb() {
    window.open(
      "http://www.facebook.com/sharer.php?u=" +
        encodeURIComponent(location.href),
      "sharewindow",
      "width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!",
    );
  }
  shareTw() {
    window.open(
      "http://twitter.com/share?text=" +
        encodeURIComponent(document.title) +
        "&url=" +
        encodeURIComponent(location.href),
      "sharewindow",
      "width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!",
    );
  }
}
</script>

<style lang="scss">
.social-share {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  &__item {
    background: transparent;
    border: 0;
    font-size: 36px;
    line-height: 1;
    padding: 0.25rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    &::before {
      display: inline-block;
      transition: all $tick ease-out;
    }
    &:hover {
      &::before {
        transform: scale(1.1);
        opacity: 0.7;
      }
    }
  }

  &--facebook {
    color: #1877f2;
    &::before {
      @include icon-facebook;
    }
  }
  &--twitter {
    color: #1da1f2;
    &::before {
      @include icon-twitter;
    }
  }
}
</style>
