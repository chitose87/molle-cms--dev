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
            multiple
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
import {Singleton} from "molle-cms/src/Singleton";

@Component({
  components: {},
})
export default class PageImport extends Vue {
  @Prop() path!: any;
  @Prop() pageId!: string;
  importModal: boolean = false;
  private createTime = firebase.firestore.Timestamp.now();

  onImport(e: Event) {
    let target = <HTMLFormElement>e.target;
    let files: FileList = target.files.files;

    if (files.length == 0) {
      alert("ファイルが選択されていません。");
      return;
    }
    if (files.length > 1) {
      alert("複数ファイル選択されています。");
      return;
    }

    let arr = new Promise((resolve, reject) => {
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
          if (Object.keys(data).length > 2) {
            alert("ファイル内に[page][items]以外のデータが存在します。");
            return;
          }

          let batch = firebase.firestore().batch();
          let rootItemId = data.page.itemId;
          let newRootItemId = Singleton.itemsRef.doc().id;

          //page import
          data.page.itemId = newRootItemId;
          data.page.path = this.path.replace(/%2F/g, "/");
          batch.set(Singleton.pagesRef.doc(this.pageId), data.page);

          //items import
          let loopReplaceUpload = (_id: string, _newId: string) => {
            if (data.items[_id].type == "children" && data.items[_id].value.length > 0) {
              for (let i in data.items[_id].value) {
                let newId = Singleton.itemsRef.doc().id;
                loopReplaceUpload(data.items[_id].value[i].id, newId);
                data.items[_id].value[i].id = newId
              }
              this.itemSet(_newId, data.items[_id], batch);
            } else {
              this.itemSet(_newId, data.items[_id], batch);
            }
          }
          loopReplaceUpload(rootItemId, newRootItemId);
          batch.commit().then(resolve);

        } catch (e) {
          alert(e);
          reject();
        }
      };
      reader.readAsText(files[0]);
    });
    arr.then(() => {
      alert("complete")
    });
  }

  itemSet(_newId: string, item: any, batch: any) {
    item.createTime = this.createTime;
    batch.set(Singleton.itemsRef.doc(_newId), item);
    // log
    batch.set(Singleton.logsRef.doc(_newId), {
      history: [{
        timestamp: this.createTime,
        uid: firebase.auth().currentUser!.uid
      }]
    });
  }


}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
