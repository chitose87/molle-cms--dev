<template lang="pug">
component.module.column__item.vertical-headline(
  :id="itemData.tagId",
  :is="itemData.option.lv || 'h3'",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  span(v-html="itemData.value || itemData.superValue || ''")
  span.headline__sub(
    v-if="itemData.option.text",
    v-html="itemData.option.text"
  )
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class VerticalHeadline extends Module {
  @Prop() static__value?: string;

  getClass() {
    let obj = super.getClass(this.itemData);
    if (this.itemData.option.col) {
      if (this.itemData.option.col == -1) {
        obj["col"] = true;
      } else {
        obj["col-" + this.itemData.option.col] = true;
      }
    }
    if (this.itemData.option.colSm) {
      if (this.itemData.option.colSm == -1) {
        obj["col-sm"] = true;
      } else {
        obj["col-sm-" + this.itemData.option.colSm] = true;
      }
    }
    return obj;
  }

  getStyle() {
    let obj = super.getStyle(this.itemData);
    if (obj.lineHeight) {
      obj.lineHeight = obj.lineHeight + "%"
    }
    if (obj.paddingTop) {
      obj.paddingTop = obj.paddingTop + "%"
    }
    if (obj.paddingRight) {
      obj.paddingRight = obj.paddingRight + "%"
    }
    let parentOpt;
    try {
      parentOpt = this.$parent.$parent.$props.itemData.option;
    } catch (e) {
      parentOpt = {};
    }
    return obj;
  }
}
</script>

<style lang="scss">
.vertical-headline {
  margin: 0;
  writing-mode: vertical-rl;
  text-orientation: upright;
  padding: 2rem;
  font-size: 2.6vw;

  @for $i from 1 through 12 {
    &.col-#{$i} {
      @include col($i);
    }
    @include mediaquery-sm {
      &.col-sm-#{$i} {
        @include col($i);
      }
    }
  }

  &.text-white {
    color: $color-text-white;
  }

  &__sub {
    display: block;
    font-size: 75%;
  }
}

h3.headline {
  &.decorate {
    position: relative;
    margin: 0;
    border-bottom: solid 1px $color-text;
    @include mediaquery-not-sm {
      font-size: 25px;
      margin-top: 2rem;
      margin-bottom: 3.5rem;
    }
    @include mediaquery-sm {
      font-size: 24px;
      margin-top: 2rem; //?
      margin-bottom: 3.5rem; //?
    }

    &.text-white {
      &:before {
        filter: brightness(2);
      }
    }
  }
}

h4.headline {
  &.decorate {
    font-size: 21px;
    border-bottom: solid 1px $color-text;
  }
}
</style>
