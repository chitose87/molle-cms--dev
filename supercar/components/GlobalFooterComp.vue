<template lang="pug">
  footer.global-footer
    ModuleLoader.global-footer__body(:node="{id:'--no-export%2Fglobal_footer'}")
</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class GlobalFooterComp extends Vue {
}
</script>

<style lang="scss">
.global-footer {
  @include mediaquery-not-sm {
    //margin-top: 5rem;
  }
  @include mediaquery-sm {
    //margin-top: 2rem;
  }

  &__body {
    text-align: center;
    background: $color-gray-900;
    @include mediaquery-not-sm {
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-bottom: 0;
    }
    @include mediaquery-sm {
    }

    .button-list {
      margin-bottom: 0.5rem;
    }
  }

  &__copy {
    color: $color-white;
    font-size: 12px;
  }

  .button {
    color: $color-white;
    display: inline-block;

    &:hover {
      color: $color-link;
      text-decoration: underline;
    }
  }

  //.site-map
  .site-map {
    &__body {
      display: flex;
      justify-content: center;
    }

    &__1st {
      margin-right: 3rem;
      margin-bottom: 0;

      > .button {
        font-size: 18px;
        color: $color-white;
        text-decoration: none;

        &:after {
          display: none;
        }
      }
    }
  }
}
</style>
