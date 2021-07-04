<template lang="pug">
ul.news-list
  li.news-list__item(v-for="item in (list||news)")
    a(:href="'/'+item.path")
      span {{item.date}}
      span.news-list__title(v-html="item.displayTitle||item.title")

</template>

<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
import {IPageData} from "~/molle/interface";
import {Utils} from "~/molle/Utils";

@Component({
  components: {}
})
export default class NewsList extends Vue {
  news: IPageData[] = [];
  @Prop({default: 0}) max!: number;
  @Prop() list?: any[];

  async fetch() {
    Utils.getPageList("news", this.$nuxt.context, (list: IPageData[]) => {
      this.$set(this, "news", list);
    }, {
      sort: "desc",// or asc
      attr: "date",
      max: this.max
    })
  }

  mounted() {
  }
}
</script>

<style lang="scss">
.news-list {
  margin-top: 2rem;
  margin-bottom: 1rem;

  &__item {
    border-top: 1px solid $color-gray-200;

    a {
      text-decoration: none;
      color: $color-text-black;
      @include mediaquery-not-sm {
        display: flex;
        padding-top: 0.7rem;
        padding-bottom: 0.7rem;
        transition: color $tick $easeOut;
        &:hover {
          color: $color-blue;
        }
      }
      @include mediaquery-sm {
        display: block;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }

      span {
        font-size: 14px;
        font-weight: bold;
        @include mediaquery-not-sm {
          padding: 1rem;
        }
        @include mediaquery-sm {
          padding-left: 1rem;
          padding-right: 1rem;
          display: block;
        }
      }
    }

    &:last-child {
      border-bottom: 1px solid $color-gray-200;
    }
  }

  &__title {
    flex: 1;
  }
}

</style>
