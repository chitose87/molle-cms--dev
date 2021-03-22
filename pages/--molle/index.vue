<template lang="pug">
no-ssr
  .molle-sys-ui.bootstrap.pt-4.pb-4
    .container-fluid
      h1.text-info MOdular Light L**** E****
        br
        | Contents Management System v0.0.4

      div(v-if="!isLogin")
        form.form-group(@submit.prevent, @submit="onLogin")
          label mail:
            input.form-control.form-control-sm(type="email" name="email")
          label password:
            input.form-control.form-control-sm(type="password" name="password")
          button.btn.btn-info(type="submit")
            span Login
      .row(v-else)
        .col-12
          .form-inline
            button.btn.btn-info(type="button" @click="onLogout")
              span Logout

            .mr-2.ml-auto
              button.btn.btn-warning(type="button", @click="deployQueToggle")
                span(v-if="systemData.deployQue") 更新中止
                span(v-else) 更新
              span Status:
              span(v-html="systemData.deployStatus")
            .mr-2
              button.btn.btn-info(type="button", @click="onExport")
                span Export
            .mr-2
              form(@submit.prevent, @submit="onImport")
                input(
                  type="file",
                  name="files",
                  accept="application/json",
                  multiple
                )
                button.btn.btn-info(type="submit")
                  span Import
        // News Data
        .col-6
          section.pt-5
            h2.mb-3 News Data

            .card.mb-3
              .card-header
                h3 Add
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

            .card.mb-3
              .card-header
                h3 List
              .card-body
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

        // Universal pages
        .col-6
          section.pt-5
            h2.mb-3 Universal pages
            .card.mb-3
              .card-header
                h3 Add
              .card-body
                label Path *
                  input.form-control(type="text", v-model="added.path")
                label Box id (Option)
                  input.form-control(type="text", v-model="added.itemId")
                button(
                  type="button",
                  :disabled="added.path === ''",
                  @click="addPage"
                ) Add

            .card.mb-3
              .card-header
                h3 List
              .card-body
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
        .col-6
          section.pt-5
            h2.mb-3 MOLLE DEVELOP ADDED
            ul
              li 画像アップロード・トリム new!
              li 編集ユーザー管理(firebase連携) new!

            h2.mb-3 MOLLE DEVELOP TODO
            ul
              li 自動デプロイ機能
              li テキストエディタ
              li 変更ログ・アンドゥ
              li モジュール入れ替え(loop注意)
              li 継承・拡張
              li 未使用モジュールの一括削除
              li itemData内に使用されているmodule-idを管理
              li データ連携モジュール
              li カスタムセット登録
              li firebaseに上げた画像をdeploy時にhostingサーバーに移動させるOption
            button.btn.btn-info(@click="cleanup")
              span データクリーンナップ
</template>

<script lang="ts">
import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import firebase from "~/node_modules/firebase";
import {Singleton} from "~/molle/Singleton";
import {IItemData, IPageData} from "~/molle/interface";

@Component({})
export default class MolleTopPage extends Vue {
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
            } else {
              this.$set(this.pages, _snap.id, pageData);
            }
          });
        },
      );
    });
  }

  onLogin(e: any) {
    firebase.auth()
      .signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
      .then((user) => {
        if (user) {
          this.isLogin = true;
        }
      })
  }

  onLogout() {
    firebase.auth().signOut();
    this.isLogin = false;
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

  deployQueToggle() {
    Singleton.systemDocRef.update({deployQue: !this.systemData.deployQue});
  }

  /**
   */
  onExport() {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify({
            pages: Object.assign({}, this.pages, this.news),
          }),
        ],
        {type: "text/plain"},
      ),
    );
    a.download = `pages-${new Date().toUTCString()}.json`;
    a.click();

    // items
    Singleton.itemsRef.get().then((snap: firebase.firestore.QuerySnapshot) => {
      let obj: any = {items: {}};
      snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        obj.items[_snap.id] = itemData;
      });
      let a = document.createElement("a");
      a.href = URL.createObjectURL(
        new Blob([JSON.stringify(obj)], {type: "application/json"}),
      );
      a.download = `items-${new Date().toUTCString()}.json`;
      a.click();
    });
  }

  /**
   *
   */
  onImport(e: Event) {
    let target = <HTMLFormElement>e.target;
    let files: FileList = target.files.files;

    if (files.length == 0) {
      alert("ファイルが選択されていません。");
      return;
    }

    if (
      !window.confirm(`
この作業は破壊的な変更です。
同一のIDの場合、既存のデータがすべて上書きされます。
重複するjsonデータを読み込む場合、優先順位に規則性はありません。
よろしいですか？`)
    )
      return;

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          let data = JSON.parse(e.target.result);
          let batch = firebase.firestore().batch();
          if (data.pages) {
            for (let id in data.pages) {
              batch.set(Singleton.pagesRef.doc(id), data.pages[id]);
            }
          } else if (data.items) {
            for (let id in data.items) {
              batch.set(Singleton.itemsRef.doc(id), data.items[id]);
            }
          } else {
            throw new Error("pagesかitemsがありませんでした。");
          }
          batch.commit().then(() => {
            alert("importが完了しました");
          });
        } catch (e) {
          alert(e);
        }
      };
      reader.readAsText(files[i]);
    }
  }

  /**
   *
   */
  cleanup() {
    console.log("cleanup");
    let batch = firebase.firestore().batch();

    Promise.all([
      Singleton.pagesRef.get(),
      Singleton.itemsRef.get()
    ]).then((v: any) => {
      let obj: any = {};
      v[1].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        obj[_snap.id] = 0;
      });
      v[1].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        let flag = false;
        //@ts-ignore
        if (itemData.type == "children") {
          for (let i in itemData.value) {
            let item = itemData.value[i];
            obj[item.id || item] += 1;
            // todo 参照されてるリストを作る
            if (typeof item == "string") {
              // node化
              itemData.value[i] = {id: item};
              flag = true;
            }
          }
          if (flag) {
            batch.update(Singleton.itemsRef.doc(_snap.id), "value", itemData.value)
          }
        }
      });
      v[0].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let pageData = <IPageData>_snap.data();
        //@ts-ignore
        obj[pageData.itemId] += 1;
      });


      //誰からも未参照のitemを削除
      console.log(obj)
      for(let id in obj){
        if(obj[id]==0){
          console.log("delete",id);
          batch.delete(Singleton.itemsRef.doc(id));
        }
      }
      batch.commit();
    })

    // Singleton.pagesRef.get().then(
    //   (snap: firebase.firestore.QuerySnapshot) => {
    //     snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
    //       let pageData = <IPageData>_snap.data();
    //       console.log(pageData);
    //
    //       Singleton.itemsRef.get().then(
    //         (qs: firebase.firestore.QuerySnapshot) => {
    //           let itemData = <IItemData>qds.data();
    //         })
    //     });
    //   }
    // )
  }
}
</script>

<style lang="scss">
.bootstrap {
  $input-placeholder-color: $color-gray-300;

  @import "~bootstrap/scss/bootstrap";
  @import "~bootstrap-vue/src/index.scss";

  @each $color, $value in $colors {
    @include bg-variant(".bg-#{$color}", $value, true);
  }
}

.molle-sys-ui {
}
</style>
