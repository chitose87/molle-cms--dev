<template lang="pug">
.pagination
  router-link.pagination__link.pagination__prev(
    :to="`./?p=${$route.query.p - 1}`"
    :disabled="!$route.query.p || $route.query.p==1"
  )
    span  前のページ

  .pagination__nums
    router-link.pagination__link(
      v-for="n of (total<pageCount?total:pageCount)"
      :key="n"
      :to="`./?p=${n + pageStart - 1}`"
      :disabled="n + pageStart - 1==$route.query.p"
    )
      span(v-html="n + pageStart - 1")

  router-link.pagination__link.pagination__next(
    :to="`./?p=${$route.query.p + 1}`"
    :disabled="$route.query.p==total"
  )
    span  次のページ
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({
  components: {}
})
export default class Pagination extends Vue {
  @Prop({default: 0}) total!: number;

  pageCount = 5;
  pageStart = 1;

  @Watch("total", {immediate: true})
  changeValue() {
    if (this.total <= this.pageCount) {
      this.pageStart = 1;
    } else {
      let v = parseInt(<string>this.$route.query.p) || 1;
      if (v <= 3) {
        this.pageStart = 1;
      } else if (v > this.total - Math.floor(this.pageCount / 2)) {
        this.pageStart = this.total - this.pageCount;
      } else {
        this.pageStart = v - Math.floor(this.pageCount / 2);
      }
    }
  }
}
</script>

<style lang="scss">
.pagination {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  margin-top: 4rem;
  @include mediaquery-sm {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__link {
    display: inline-block;
    padding: 0.5rem 1rem;
    transition: color $tick $easeOut;

    &:hover, &[disabled] {
      color: $color-gray-300;
    }
  }

  &__prev {
    padding-left: 0;

    &:before {
      @include icon-left-open;
      transform: scale(0.7);
      display: inline-block;
      margin-right: 0.5rem;
    }
  }

  &__next {
    padding-right: 0;

    &:after {
      @include icon-right-open;
      transform: scale(0.7);
      display: inline-block;
      margin-left: 0.5rem;
    }
  }

  &__nums {
    text-align: center;

    @include mediaquery-not-sm {
      margin-left: auto;
      margin-right: auto;
    }
    @include mediaquery-sm {
      order: -1;
      flex-basis: 100%;
      margin-bottom: 3rem;
    }
  }

}
</style>
