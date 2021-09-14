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
              | {{$words.news}} Data
          //li
            a.btn-link(href="#case")
              b-icon.mr-2(icon="newspaper")
              | Case Study
          li
            a.btn-link(href="#universal")
              b-icon.mr-2(icon="file-earmark")
              | {{$words.universal}} {{$words.page}}

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
            | {{$words.news}} Data
          .row
            .col
              IndexPageListView(:pages="news")
              ul.list-group

            .col-4
              .card.position-sticky(style="top:0")
                .card-header
                  h3.mt-0
                    b-icon(icon="file-earmark-plus")
                    | {{$words.add}} {{$words.page}}
                .card-body
                  p
                    label.mr-2
                      span 日付
                      input.form-control(type="date", v-model="addNewsObj.date")
                    label.mr-2
                      span タグ
                      select.form-control(v-model="addNewsObj.option.tag")
                        option(value="活動報告") 活動報告
                        option(value="お知らせ") お知らせ
                    label.mr-2
                      span ディレクトリ名 (Option 変更不可)
                      input.form-control(
                        type="text",
                        v-model="addNewsObj.id",
                        :placeholder="addNewsObj.date"
                      )
                  p
                    label.w-100.mr-2
                      span タイトル
                      input.form-control(type="text", v-model="addNewsObj.title")

                  button.btn.btn-primary.btn-block(
                    type="button",
                    :disabled="addNewsObj.date === '' || addNewsObj.title === ''",
                    @click="addNews"
                  ) {{$words.add}}

        // Universal pages
        section#universal.mt-1r.mb-6r
          h2.p-3.mt-0.mb-4.bg-info.text-white
            b-icon.mr-2(icon="file-earmark")
            | {{$words.universal}} {{$words.page}}
          .row
            .col
              IndexPageListView(:pages="pages")

            .col-4
              .card.position-sticky(style="top:0")
                .card-header
                  h3.mt-0
                    b-icon(icon="file-earmark-plus")
                    | {{$words.add}} {{$words.page}}
                .card-body
                  label {{$words.path}} *
                    input.form-control(type="text", v-model="added.path")
                  label Box id (Option)
                    input.form-control(type="text", v-model="added.itemId")
                  button.btn.btn-primary.btn-block(
                    type="button",
                    :disabled="added.path === ''",
                    @click="addPage"
                  ) {{$words.add}}

        section#site.mt-1r.mb-6r
          SiteSettingsComp

        section#project.mt-1r.mb-6r
          ProjectSettingsComp

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "~/molle-cms/src/Singleton";
import {IItemData, IPageData} from "~/molle-cms/src/interface";
import MolleToolbar from "~/molle-cms/src/ui/MolleToolbar.vue";
import IndexPageListView from "~/molle-cms/src/ui/IndexPageListView.vue";
import ProjectSettingsComp from "~/molle-cms/src/ui/ProjectSettingsComp.vue";
import SiteSettingsComp from "~/molle-cms/src/ui/SiteSettingsComp.vue";

@Component({
  components: {SiteSettingsComp, ProjectSettingsComp, IndexPageListView, MolleToolbar},
})
export default class MolleTopPage extends Vue {
  version = process.env.version;

  addNewsObj = {
    id: "",
    date: "",
    title: "",
    option: {},
  };

  added = {
    path: "",
    itemId: "",
    option: {},
  };

  pages: {[key: string]: IPageData} = {};
  news: {[key: string]: IPageData} = {};

  isLogin = false;

  head() {
    return {
      title: "[MOLLE]" + process.env.title,
    };
  }

  created() {
    Singleton.firebaseInit((user: any) => {
      if (!user) return;
      this.$set(this,"isLogin",true);

      Singleton.pagesRef.onSnapshot(
        (snap: firebase.firestore.QuerySnapshot) => {
          this.$set(this, "pages", {});
          this.$set(this, "news", {});

          snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
            let pageData = <IPageData>_snap.data();
            if (pageData.path.indexOf("news/") == 0) {
              this.$set(this.news, _snap.id, pageData);
              // } else if (pageData.path.indexOf("case-study/") == 0) {
              //   this.$set(this.casestudy, _snap.id, pageData);
            } else {
              this.$set(this.pages, _snap.id, pageData);
            }
          });
        },
      );
    });
  }

  /**
   *
   */
  addNews() {
    let path = "news/" + (this.addNewsObj.id || this.addNewsObj.date);
    let pageId = encodeURIComponent(path);
    // console.log(this.addNewsObj.date);
    Singleton.pagesRef.doc(pageId).set({
      path: path,
      itemId: pageId,
      title: this.addNewsObj.title,
      date: this.addNewsObj.date,
    });
  }

  /**
   *
   */
  addPage() {
    let pageId = encodeURIComponent(this.added.path);
    Singleton.pagesRef.doc(pageId).set({
      path: this.added.path,
      itemId: this.added.itemId || pageId,
    });
  }
}
</script>

<style lang="scss">
.molle-sys-ui {
}
</style>
