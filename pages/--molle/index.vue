<template lang="pug">
.molle-sys-ui.bootstrap
  div.d-flex.flex-nowrap
    div(style="width:210px;z-index:100")
      .container-fluid.position-sticky.pt-3.pb-3(style="top:0")
        h1.text-info.mt-0
          span.text-nowrap MOdular
          span.text-nowrap Light
          span.text-nowrap L****
          span.text-nowrap E****
        p.text-info Contents Management System v{{version}}

        hr
        ul(v-if="isLogin")
          li
            a.btn-link(href="#readme")
              b-icon.mr-2(icon="book")
              | Readme
          li
            a.btn-link(href="#news")
              b-icon.mr-2(icon="newspaper")
              | News Data
          //li
            a.btn-link(href="#case")
              b-icon.mr-2(icon="newspaper")
              | Case Study
          li
            a.btn-link(href="#universal")
              b-icon.mr-2(icon="file-earmark")
              | Universal pages

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
            | News Data
          .row
            .col
              ul.list-group
                li.list-group-item.list-group-item-action.d-flex.justify-content-between(
                  v-for="(item, key) in news"
                )
                  span.mr-2(v-html="item.date || '0000-00-00'")
                  span.mr-2 :
                  span.mr-2(v-html="item.title || '{no title}'")
                  label.mr-2
                    select.form-control.form-control-sm(
                      :value="item.option && item.option.tag",
                      @change="(e) => changeItemTag(key, item, e.target.value)"
                    )
                      option(value="活動報告") 活動報告
                      option(value="お知らせ") お知らせ
                  NuxtLink.mr-auto(
                    :to="{path: '/--molle/editer', query: {pageId: key, edit: 'true'}}"
                  )
                    span(v-html="item.path + '/'")
                    b-icon(icon="chevron-right")
                  button.btn.btn-danger(
                    type="button",
                    @click="deletePage(key)"
                  ) Delete

            .col-4
              .card.position-sticky(style="top:0")
                .card-header
                  h3.mt-0
                    b-icon(icon="file-earmark-plus")
                    | Add Page
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
                  ) Add

        // Universal pages
        section#universal.mt-1r.mb-6r
          h2.p-3.mt-0.mb-4.bg-info.text-white
            b-icon.mr-2(icon="file-earmark")
            | Universal pages
          .row
            .col
              ul.list-group
                li.list-group-item.list-group-item-action.d-flex.justify-content-between(
                  v-for="(item, key) in pages"
                )
                  span.mr-2(v-html="item.date || '0000-00-00'")
                  span.mr-2 :
                  span.mr-2(v-html="item.title || '{no title}'")

                  NuxtLink.mr-auto(
                    :to="{path: '/--molle/editer', query: {pageId: key, edit: 'true'}}"
                  )
                    span(v-html="item.path")
                    b-icon(icon="chevron-right")
                  button.btn.btn-danger(
                    type="button",
                    @click="deletePage(key)"
                  ) Delete

            .col-4
              .card.position-sticky(style="top:0")
                .card-header
                  h3.mt-0
                    b-icon(icon="file-earmark-plus")
                    | Add Page
                .card-body
                  label Path *
                    input.form-control(type="text", v-model="added.path")
                  label Box id (Option)
                    input.form-control(type="text", v-model="added.itemId")
                  button.btn.btn-primary.btn-block(
                    type="button",
                    :disabled="added.path === ''",
                    @click="addPage"
                  ) Add

        section.mt-1r.mb-6r
          h2.p-3.mt-0.mb-4.text-white.bg-success
            b-icon.mr-2(icon="tools")
            | MOLLE DEVELOP
          h4.mb-2 ADDED/追加された機能
          ul
            li 自動デプロイ機能 new!
            li 未使用モジュールの一括削除
            li 管理画面のデザイン変更

          h4.mb-2 READY/追加可能機能
          ul
            li テキストエディタ

          h4.mb-2 TODO
          ul
            li 変更ログ・アンドゥ
            li モジュール入れ替え(loop注意)
            li 継承・拡張
            li itemData内に使用されているmodule-idを管理
            li データ連携モジュール
            li カスタムセット登録
            li firebaseに上げた画像をdeploy時にhostingサーバーに移動させるOption

</template>

<script lang="ts">
import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import firebase from "~/node_modules/firebase";
import {Singleton} from "~/molle/Singleton";
import {IItemData, IPageData} from "~/molle/interface";
import MolleToolbar from "~/molle/ui/MolleToolbar.vue";

@Component({
  components: {MolleToolbar}
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

  pages: { [key: string]: IPageData } = {};
  news: { [key: string]: IPageData } = {};
  systemData = {deployQue: false, deployStatus: "undefinde"};

  isLogin = false;

  head() {
    return {
      title: "[MOLLE]" + process.env.title,
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/jimp/0.16.1/jimp.js"
      }]
    }
  }

  created() {
    Singleton.firebaseInit((user: any) => {
      if (!user) return;
      this.isLogin = true;
      Singleton.systemDocRef.onSnapshot(
        (snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            Singleton.systemDocRef.set({
              deployQue: false,
              deployStatus: "undefinde",
            });
            return;
          }
          this.$set(this, "systemData", snap.data());
        },
      );

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
    console.log(this.addNewsObj.date);
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

  /**
   *
   * @param id
   */
  deletePage(id: string) {
    Singleton.pagesRef.doc(id).delete();
  }

  changeItemTag(id: string, item: any, value: string) {
    let update = {option: item.option || {}};
    update.option.tag = value;
    Singleton.pagesRef.doc(id).update(update);
  }
}
</script>

<style lang="scss">
.molle-sys-ui {
}
</style>
