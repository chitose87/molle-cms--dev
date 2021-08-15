<template lang="pug">
.d-flex
  button.btn.btn-warning.m-1(type="submit" @click="importModal=true") Import
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
import {
  Component,
  Vue,
  Prop,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "~/molle-cms/src/Singleton";
import {IItemData, INodeObject, IPageData} from "~/molle-cms/src/interface";
import {Utils} from "~/molle-cms/src/Utils";

@Component({
  components: {},
})
export default class PageImport extends Vue {
  @Prop() pageData!: IPageData;
  @Prop() pageId!: string;
  importModal: boolean = false;

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
.molle-tool-bar {
}
</style>
