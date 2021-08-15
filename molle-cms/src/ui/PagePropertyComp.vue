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

      hr

      .mb-2
        button.btn.btn-info(type="button" @click="onExport")
          span Export
      .mb-2
        button.btn.btn-warning(type="submit" @click="importModal=true")
          span Import
        .modal(v-if="importModal" :aria-expanded="importModal")
          .modal__fiexd
            .modal__close(@click="importModal=!importModal")
            .modal__body
              form(@submit.prevent, @submit="onImport")
                input(
                  type="file",
                  name="files",
                  accept="application/json",
                )
                button.btn.btn-info(type="submit")
                  span Import

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop,} from "nuxt-property-decorator";
import {IItemData, INodeObject, IPageData} from "molle-cms/src/interface";
import {Singleton} from "molle-cms/src/Singleton";
import GoogleStorage from "molle-cms/src/ui/GoogleStorage.vue";
import InputUrlByGS from "molle-cms/src/ui/property/InputUrlByGS.vue";
import firebase from "firebase";
import {Utils} from "molle-cms/src/Utils";

@Component({
  components: {InputUrlByGS, GoogleStorage},
})
export default class PagePropertyComp extends Vue {
  @Prop() pageData!: IPageData;
  @Prop() pageId!: string;

  importModal: boolean = false;

  @Watch("pageData", {immediate: true})
  onChangePageData(newer: string, older?: string) {
  }

  update() {
    Singleton.pagesRef.doc(this.pageId).update(this.pageData);
  }

  onExport() {
    let totalCount = 0;
    let loopFinishCount = 0;
    let obj: any = {
      page: {},
      items: {},
    };

    // page
    obj.page = this.pageData;
    // items
    itemsLoop(this.pageData.itemId, () => {
      if (totalCount === loopFinishCount) {

        //export
        let a = document.createElement("a");
        a.href = URL.createObjectURL(
          new Blob(
            [JSON.stringify(obj)],
            {type: "application/json"}),
        );
        a.download = `${this.pageData.path}-${this.pageData.title}-${new Date().toUTCString()}.json`;
        a.click();
      }
    });

    /**
     *
     * @param _itemId
     * @param end
     */
    function itemsLoop(_itemId: any, end: any) {
      totalCount++;
      Singleton.itemsRef.doc(_itemId)
        .get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          obj.items[_itemId] = snap.data();
          let itemData: any = snap.data();

          if (itemData.type == "group"
            || (itemData.type == "children" && itemData.value.length > 0)) {
            let count: number = 0;
            for (let i in itemData.value) {
              count++;
              itemsLoop(itemData.value[i].id, () => {
                count--;
                if (count == 0) {
                  loopFinishCount++;
                  end();
                }
              });
            }
          } else {
            loopFinishCount++;
            end();
          }
        });
    }
  }

  onImport(e: Event) {
    let target = <HTMLFormElement>e.target;
    let files: FileList = target.files.files;

    if (files.length == 0) {
      alert("ファイルが選択されていません。");
      return;
    }

    let reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        let data = JSON.parse(e.target.result);
        if (!data.items) {
          alert("ファイル内にitemsDataが存在しません。");
          return;
        }
        if (!data.page) {
          alert("ファイル内にpageDataが存在しません。");
          return;
        }

        let createTime = firebase.firestore.Timestamp.now();
        let batchQue: any = [];

        //items import
        let loopReplaceUpload = (node: INodeObject) => {
          let _newId = Singleton.itemsRef.doc().id;
          let item = <IItemData>data.items[node.id];
          if (item.type == "group" || item.type == "children") {
            for (let i in item.value) {
              // console.log(item.value[i])
              item.value[i].id = loopReplaceUpload(item.value[i]);
            }
          }

          // itemSet
          item.createTime = createTime;
          batchQue.push({
            cmd: "set",
            ref: Singleton.itemsRef.doc(_newId),
            data: item,
          });

          // log
          batchQue.push({
            cmd: "set",
            ref: Singleton.logsRef.doc(_newId),
            data: {
              history: [{
                timestamp: createTime,
                uid: firebase.auth().currentUser!.uid,
              }],
            },
          });
          return _newId;
        };

        //page import
        data.page.itemId = loopReplaceUpload({id: data.page.itemId});
        data.page.path = this.pageData.path;

        batchQue.push({
          cmd: "set",
          ref: Singleton.pagesRef.doc(this.pageId),
          data: data.page,
        });

        // commit
        Utils.updateBatch(batchQue).then(() => {
          alert("complete");
        });

      } catch (e) {
        alert(e);
      }
    };
    reader.readAsText(files[0]);
  }

}
</script>

<style lang="scss">
.page-property-comp {
}
</style>
