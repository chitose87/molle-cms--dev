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
  @Prop() itemId!: any;
  @Prop() path!:any;
  importModal: boolean = false;
  private createTime = firebase.firestore.Timestamp.now();

  onImport(e: Event) {
    let target = <HTMLFormElement>e.target;
    let files: FileList = target.files.files;
    let rootItemId = Singleton.itemsRef.doc().id;

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
    ) return;

    let arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            let data = JSON.parse(e.target.result);
            let _arr = [];
            let batch = firebase.firestore().batch();
            let batchCount = 0;
            let ref: any = data.pages ? Singleton.pagesRef
              : data.items ? Singleton.itemsRef
                : reject();

            if (data.items) {
              let loopReplaceUpload = (_id: string, _newId: string) => {
                let n: number;
                if (data.items[_id].type == "children" && data.items[_id].value.length > 0) {
                  for (let i in data.items[_id].value) {
                    n = Number(i);
                    let newId = ref.doc().id;
                    loopReplaceUpload(data.items[_id].value[n].id, newId);
                    data.items[_id].value[n].id = newId
                  }
                  data.items[_id].createTime = this.createTime;
                  batch.set(ref.doc(_newId), data.items[_id]);
                  if (++batchCount >= 500) {
                    _arr.push(batch.commit());
                    batch = firebase.firestore().batch();
                    batchCount = 0;
                  }
                } else {
                  data.items[_id].createTime = this.createTime;
                  batch.set(ref.doc(_newId), data.items[_id]);
                  if (++batchCount >= 500) {
                    _arr.push(batch.commit());
                    batch = firebase.firestore().batch();
                    batchCount = 0;
                  }
                }
              }

              let rootId = Object.keys(data.items)[0];
              loopReplaceUpload(rootId, rootItemId);

              _arr.push(batch.commit());
              Promise.all(_arr).then(resolve);
            }

            if (data.pages) {
              if (Object.keys(data.pages)[1]) {
                alert("ファイル内のデータにページが複数存在します。");
                return;
              }
              let rootId = Object.keys(data.pages)[0];
              data.pages[rootId].itemId = rootItemId;
              data.pages[rootId].path = this.path.replace(/%2F/g, "/");
              batch.set(ref.doc(this.itemId), data.pages[rootId]);
              _arr.push(batch.commit());
              Promise.all(_arr).then(resolve);
            }

          } catch (e) {
            alert(e);
            reject();
          }
        };
        reader.readAsText(files[i]);
      }));
    }

    Promise.all(arr).then(() => {
      alert("complete")
    });

  }
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
