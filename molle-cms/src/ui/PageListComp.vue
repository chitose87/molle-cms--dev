<template lang="pug">
.page-list-comp
  .card.bg-light
    .card-header.pt-1.pb-1.pl-3.pr-3(@click="expand.all=!expand.all") ページ一覧
      b-icon(:icon="expand.all?'chevron-up':'chevron-down'")
    .card-body.p-0.pb-3(v-if="expand.all")
      div
        button.btn.btn-sm.btn-link.btn-block.text-left(@click="expand.news=!expand.news")
          span News 一覧
          b-icon(:icon="expand.news?'chevron-up':'chevron-down'")

        .item-list-item-comp.list-group-item.p-0.pl-2.pb-3.border-right-0(v-if="expand.news")
          // news
          .item-list-item-comp.list-group-item.list-group-item-action.p-0(
            v-for="(item, key) in news"
          )
            NuxtLink.btn.btn-sm.btn-link.btn-block.text-left(
              :to="{path: '/'+item.path, query: {edit: 'true'}}"
            )
              b-icon.ml-n1.mr-1(icon="window")
              b(v-html="item.path")

      div
        button.btn.btn-sm.btn-link.btn-block.text-left(@click="expand.universal=!expand.universal")
          span Universal 一覧
          b-icon(:icon="expand.universal?'chevron-up':'chevron-down'")
        .item-list-item-comp.list-group-item.p-0.pl-2.pb-3.border-right-0(v-if="expand.universal")
          // pages
          .item-list-item-comp.list-group-item.list-group-item-action.p-0(
            v-for="(item, key) in pages"
          )
            NuxtLink.btn.btn-sm.btn-link.btn-block.text-left(
              :to="{path: '/'+item.path, query: {edit: 'true'}}"
            )
              b-icon.ml-n1.mr-1(icon="window")
              b(v-html="item.path")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "../Singleton";
import {IPageData} from "../interface";

@Component({
  components: {},
})
export default class PageListComp extends Vue {
  pages: {[key: string]: IPageData} = {};
  news: {[key: string]: IPageData} = {};

  expand = {
    all: false,
    news: false,
    universal: false,
  };
  inited = false;

  @Watch("expand.all")
  flagChange() {
    if (!this.inited && this.expand.all) {
      this.inited = true;
      Singleton.pagesRef.onSnapshot(
        (snap: firebase.firestore.QuerySnapshot) => {
          this.$set(this, "pages", {});
          this.$set(this, "news", {});

          snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
            let pageData = <IPageData>_snap.data();
            if (pageData.path.indexOf("news/") == 0) {
              this.$set(this.news, _snap.id, pageData);
              //   // } else if (pageData.path.indexOf("case-study/") == 0) {
              //   //   this.$set(this.casestudy, _snap.id, pageData);
            } else {
              this.$set(this.pages, _snap.id, pageData);
            }
          });
        });
    }
  }
}
</script>

<style lang="scss">
.page-list-comp {
}
</style>
