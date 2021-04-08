<template lang="pug">
.page-property-comp(v-if="!lsStore.storage.focusModuleNode.id")
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
        span OGP画像:
        input.form-control.form-control-sm(
          type="text",
          v-model="pageData.ogpImg",
          @change="update",
          placeholder="https://---"
        )

      label
        span 日付(表示用):
        input.form-control.form-control-sm(
          type="date",
          v-model="pageData.date",
          @change="update"
        )

      hr

      label.small.form-inline
        input.form-control.form-control-sm(
          v-model="pageData.noExport",
          type="checkbox",
          @change="update"
        )
        span :書き出さない

      label.small
        span Preview:
        a(:href="`/--preview/${pageData.path}`" target="_blank")
          span(v-html="pageData.path")
        //input.form-control.form-control-sm(
        //  v-model="pageData.path"
        //  disabled="disable"
        //)
      label.small
        span itemId:
        span(v-html="pageData.itemId")
        //input.form-control.form-control-sm(
        //  v-model="pageData.itemId"
        //  disabled="disable"
        //)
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IPageData} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";

@Component({
  components: {},
})
export default class PagePropertyComp extends Vue {
  @Prop() pageData!: IPageData;
  @Prop() pageId!: string;

  lsStore = lsStore;

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
