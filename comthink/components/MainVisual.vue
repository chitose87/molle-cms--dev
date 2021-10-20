<template lang="pug">
.main-visual
  Headline(
    :static__value="pageData.displayTitle||pageData.title"
    :static__option="{lv:'h2'}"
  )
  picture(v-if="pageData.theme && pageData.theme!='minimum'")
    source(
      media="(max-width:" + (process.env.breakPoint - 1) + "px)"
      :srcset="pageData.mainVisualSp"
      alt=""
    )
    img.main-visual__bg(:src="pageData.mainVisual" alt="")

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import {IPageData} from "~/molle-cms/src/interface";

@Component({
  components: {}
})
export default class MainVisual extends Vue {
  @Prop() pageData!: IPageData;

  mounted() {
  }
}
</script>

<style lang="scss">
.main-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > .headline {
    margin-top: 0;
    margin-bottom: 0;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
}

.theme-- {
  &primary {
    .main-visual {
      height: 20rem;
    }
  }

  &primary-invert {
    .main-visual {
      height: 20rem;
      color: $color-white;
    }
  }

  &secondary {
    .main-visual {
      height: 8rem;
    }
  }

  &secondary-invert {
    .main-visual {
      height: 8rem;
      color: $color-white;
    }
  }

  &minimum {
    .main-visual {
      height: 8rem;
      border: 1px solid $color-gray-400;
    }
  }
}
</style>
