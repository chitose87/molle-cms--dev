<template lang="pug">
.l-body.news
  GlobalHeaderComp
  article.l-content
    section
      .container
        PageTitle(:value="`News`")

        //Dynamic after the second page
        NewsList(:list="json" v-if="$route.query.p>1")

        //The first page is static
        NewsList(:max="viewCount" v-else)

        Pagination(v-if="pageTotal>1" :total="pageTotal")

  GlobalFooterComp
</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import {Utils} from "~/molle/Utils";
import {IPageData} from "~/molle/interface";

@Component({
  components: {},
})
export default class News extends Vue {
  viewCount = 10;
  pageTotal = 1;
  json = [];

  created() {
    Utils.getPageList("news", this.$nuxt.context, (list: IPageData[]) => {
      this.$set(this, "pageTotal", Math.ceil(list.length / this.viewCount))
    }, {
      sort: "desc",// or asc
      attr: "date"
    })
  }

  @Watch("$route.query.p", {immediate: true})
  changeValue(p: number, before: string) {
    if (p > 1) {
      fetch(`/news/news-page-${p}.json`)
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response;
        })
        .then(data => data.json())
        .then(json => {
          this.$set(this, "json", json);
        })
        .catch((e) => {
          console.log("error", e);
          this.$router.push({query: {}})
        });
    }
  }
}
</script>

<style lang="scss">
.news {

}
</style>
