<template lang="pug">
.page-property-comp(v-if="!$route.query.focus || $route.query.focus==0")
  .card.bg-light
    .card-header.pt-1.pb-1.pl-3.pr-3 ページ設定
    .card-body.p-3
      label
        span Title (meta):
        textarea.form-control.form-control-sm(
          v-model="pageData.title",
          :placeholder="pageData.displayTitle",
          @change="update"
        )
      label
        span Title (表示用):
        textarea.form-control.form-control-sm(
          v-model="pageData.displayTitle",
          :placeholder="pageData.title",
          @change="update"
        )
      label
        span Description (meta):
        textarea.form-control.form-control-sm(
          v-model="pageData.description",
          @change="update"
        )

      label
        span 日付(表示用):
        input.form-control.form-control-sm(
          type="date",
          v-model="pageData.date",
          @change="update"
        )

      InputUrlByGS(
        :label="'OGP画像:'"
        v-model="pageData.ogpImg"
        @change="update"
      )

      InputUrlByGS(
        :label="'サムネイル:'"
        v-model="pageData.thumb"
        @change="update"
      )

      GoogleStorage

      hr

      label.small.form-inline
        input.form-control.form-control-sm(
          v-model="pageData.noExport",
          type="checkbox",
          @change="update"
        )
        span :書き出さない

      label
        span Preview:
        input.form-control.form-control-sm(
          type="text"
          v-model="pageData.preview"
          :placeholder="`/${pageData.path}`"
          @change="update"
        )
      p.small
        span /
        a(:href="`/${pageData.preview || pageData.path}`" target="_blank")
          span(v-html="`${pageData.preview || pageData.path}`")
          b-icon.ml-2(icon="window")

      p.small
        span itemId:
        span(v-html="pageData.itemId")
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop,} from "nuxt-property-decorator";
import {IPageData} from "molle-cms/src/interface";
import {Singleton} from "molle-cms/src/Singleton";
import GoogleStorage from "molle-cms/src/ui/GoogleStorage.vue";
import InputUrlByGS from "molle-cms/src/ui/property/InputUrlByGS.vue";

@Component({
  components: {InputUrlByGS, GoogleStorage},
})
export default class PagePropertyComp extends Vue {
  @Prop() pageData!: IPageData;
  @Prop() pageId!: string;

  @Watch("pageData", {immediate: true})
  onChangePageData(newer: string, older?: string) {
  }

  update() {
    Singleton.pagesRef.doc(this.pageId).update(this.pageData);
  }
}
</script>

<style lang="scss">
.page-property-comp {
}
</style>
