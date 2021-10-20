<template lang="pug">
.molle-sys-ui.bootstrap
  div.d-flex.flex-nowrap
    div(style="width:210px;z-index:100")
      .container-fluid.position-sticky.pt-3.pb-3(style="top:0")
        h1.text-info.mt-0
          span.text-nowrap MOdular
          span.text-nowrap Light
          span.text-nowrap Layout
          span.text-nowrap Easy
        p.text-info Contents Management System v{{version}}

        hr
        ul(v-if="isLogin")
          li
            a.btn-link(href="#readme")
              b-icon.mr-2(icon="book")
              | {{$words.readme}}
          li
            a.btn-link(href="#news")
              b-icon.mr-2(icon="newspaper")
              | {{$words.news}}
          li
            a.btn-link(href="#universal")
              b-icon.mr-2(icon="file-earmark")
              | {{$words.universal}}
          li
            a.btn-link(href="#no-export")
              b-icon.mr-2(icon="file-x")
              | 非出力ページ

        MolleToolbar(v-model="isLogin")

    .w-100(v-if="isLogin")
      .container-fluid
        // Read me
        section#readme.mt-1r.mb-6r
          ModuleLoader(:node="{id:'_readme'}")

        // News Data
        section#news.mt-1r.mb-6r
          h2.p-3.mt-0.mb-4.bg-info.text-white
            b-icon.mr-2(icon="newspaper")
            | {{$words.news}}
          .row
            .col
              IndexPageListView(:pages="pages.news")
            .col-4
              IndexPageAddView.position-sticky(
                :prefix="'news/'"
                :isDateField="true"
                :tags="[{1:'お知らせ'},{2:'活動報告'}]"
              )

        // Universal pages
        section#universal.mt-1r.mb-6r
          h2.p-3.mt-0.mb-4.bg-info.text-white
            b-icon.mr-2(icon="file-earmark")
            | {{$words.universal}}
          .row
            .col
              IndexPageListView(:pages="pages.universal")

            .col-4
              IndexPageAddView.position-sticky()

        // no export pages
        section#no-export.mt-1r.mb-6r
          h2.p-3.mt-0.mb-4.bg-info.text-white
            b-icon.mr-2(icon="file-x")
            | 非出力ページ
          .row
            .col
              IndexPageListView(:pages="pages.noExport")

            .col-4
              IndexPageAddView.position-sticky(
                :prefix="'_no-export/'"
              )

        section#site.mt-1r.mb-6r
          SiteSettingsComp

        section#project.mt-1r.mb-6r
          ProjectSettingsComp

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "~/molle-cms/src/Singleton";
import {IPageData} from "~/molle-cms/src/interface";
import MolleToolbar from "~/molle-cms/src/ui/MolleToolbar.vue";
import IndexPageListView from "~/molle-cms/src/ui/IndexPageListView.vue";
import IndexPageAddView from "~/molle-cms/src/ui/IndexPageAddView.vue";
import ProjectSettingsComp from "~/molle-cms/src/ui/ProjectSettingsComp.vue";
import SiteSettingsComp from "~/molle-cms/src/ui/SiteSettingsComp.vue";

@Component({
  components: {IndexPageAddView, SiteSettingsComp, ProjectSettingsComp, IndexPageListView, MolleToolbar},
})
export default class MolleTopPage extends Vue {
  version = process.env.version;

  pages: any = {};
  isLogin = false;

  head() {
    return {
      title: "[MOLLE]" + process.env.title,
    };
  }

  created() {
    Singleton.firebaseInit((user: any) => {
      if (!user) return;
      this.$set(this, "isLogin", true);

      Singleton.pagesRef.onSnapshot(
        (snap: firebase.firestore.QuerySnapshot) => {
          let pages: any = {
            news: {},
            noExport: {},
            universal: {},
          };

          snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
            let pageData = <IPageData>_snap.data();
            if (pageData.path.indexOf("news/") == 0) {
              pages.news[_snap.id] = pageData;
            } else if (pageData.path.indexOf("_no-export/") == 0) {
              pages.noExport[_snap.id] = pageData;
            } else {
              pages.universal[_snap.id] = pageData;
            }
          });
          this.$set(this, "pages", pages);
        },
      );
    });
  }
}
</script>

<style lang="scss">
.molle-sys-ui {
}
</style>
