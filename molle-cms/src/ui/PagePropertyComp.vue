<template lang="pug">
.page-property-comp
  .card.bg-light
    .card-header.pt-1.pb-1.pl-3.pr-3(@click="flag=!flag") {{$words.page}} {{$words.settings}}
      b-icon(:icon="flag?'chevron-up':'chevron-down'")
    .card-body.p-3(v-if="flag")
      label.w-100
        span {{$words.title}} ({{$words.meta}}):
        textarea.form-control.form-control-sm(
          v-model="pageData.title",
          :placeholder="pageData.displayTitle",
          @change="update"
        )
      label.w-100
        span {{$words.title}} ({{$words.display}}):
        textarea.form-control.form-control-sm(
          v-model="pageData.displayTitle",
          :placeholder="pageData.title",
          @change="update"
        )
      label.w-100
        span {{$words.description}} ({{$words.meta}}):
        textarea.form-control.form-control-sm(
          v-model="pageData.description",
          @change="update"
        )

      label.w-100
        span {{$words.date}}({{$words.display}}):
        input.form-control.form-control-sm(
          type="date",
          v-model="pageData.date",
          @change="update"
        )

      InputUrlByGS(
        :label="$words.ogp+$words.image+':'"
        v-model="pageData.ogpImg"
        @change="update"
      )

      InputUrlByGS(
        :label="$words.thumbnail+':'"
        v-model="pageData.thumb"
        @change="update"
      )

      hr
      //ページトップのテーマ
      div
        label.form-inline
          span.mr-1 {{$words.theme}}:
          select.form-control.form-control-sm(v-model="pageData.theme" @change="update")
            option(v-for="i in ['', 'primary', 'primary-invert', 'secondary', 'secondary-invert', 'minimum']" :val="i" v-html="i")

        InputUrlByGS(
          :label="$words.main+$words.visual+':'"
          v-model="pageData.mainVisual"
          @change="update"
        )

        InputUrlByGS(
          :label="$words.main+$words.visual+$words.sp+':'"
          v-model="pageData.mainVisualSp"
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
        span :{{$words.donotExport}}

      div(v-if="pageData.noExport")
        span {{$words.redirect}}:
        NuxtLink.mr-2(
          :to="{path: '/'+(pageData.redirect || ''), query: {edit: 'true'}}"
        )
          span /{{pageData.redirect || ""}}
          b-icon(icon="chevron-right")
        input.form-control.form-control-sm(
          v-model="pageData.redirect",
          @change="update"
        )

      hr

      .mb-2
        button.btn.btn-info(type="button" @click="onExport")
          span {{$words.export}}
        button.btn.btn-warning(type="submit" @click="importModal=true")
          span {{$words.import}}
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
                  span {{$words.import}}

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IItemData, INodeObject, IPageData} from "~/molle-cms/src/interface";
import {Singleton} from "~/molle-cms/src/Singleton";
import GoogleStorage from "~/molle-cms/src/ui/GoogleStorage.vue";
import InputUrlByGS from "~/molle-cms/src/ui/property/InputUrlByGS.vue";
import firebase from "firebase";
import {Utils} from "~/molle-cms/src/Utils";

@Component({
  components: {InputUrlByGS, GoogleStorage},
})
export default class PagePropertyComp extends Vue {
  @Prop() pageData!: IPageData;
  @Prop() pageId!: string;

  flag = false;
  importModal: boolean = false;

  @Watch("pageData", {immediate: true})
  onChangePageData(newer: string, older?: string) {
  }

  update() {
    Singleton.pagesRef.doc(this.pageId).update(this.pageData);
  }

  /**
   *
   */
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

  /**
   *
   * @param e
   */
  onImport(e: Event) {
    let target = <HTMLFormElement>e.target;
    let files: FileList = target.files.files;
    let count: number = 0;

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
          let _newId: any = Singleton.itemsRef.doc().id;
          count++;
          if (count == 1) {
            _newId = this.pageData.itemId;
          }
          let item = <IItemData>data.items[node.id];
          if (item.type == "group" || item.type == "children") {
            for (let i in item.value) {
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
