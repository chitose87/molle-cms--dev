<template lang="pug">
.d-flex
  button.btn.btn-warning.ml-2(type="submit" @click="importModal=true") Import
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
  Watch,
  Prop, Emit,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "molle-cms/src/Singleton";
import {IItemData, INodeObject, IPageData} from "molle-cms/src/interface";

@Component({
  components: {},
})
export default class PageImport extends Vue {
  @Prop() public value!: any;
  @Prop() pageId!: any;

  importModal: boolean = false;


  @Emit()
  public input(value: any) {
  }

  protected get localValue(): any {
    return this.value;
  }

  protected set localValue(value: any) {
    this.input(value);
  }

  importModal: boolean = false;
  deployModal: boolean = false;
  currentCIFlow: any = {};
  schedule = {
    min: "",
    date: "",
    active: false
  }

  user = {
    email: ""
  }


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
            let items = data.pages || data.items;
            let ref: any = data.pages ? Singleton.pagesRef
              : data.items ? Singleton.itemsRef
                : reject();

            let idReplaceUpload = (_id: string,_newId:string) => {
              let n: number;
              if (items[_id].type == "children" && items[_id].value.length > 0) {
                for (let i in items[_id].value) {
                  n = Number(i);
                  let newId = ref.doc().id;
                  idReplaceUpload(items[_id].value[n].id,newId);
                  items[_id].value[n].id = newId
                }
                batch.set(ref.doc(_newId), items[_id]);
                if (++batchCount >= 500) {
                  _arr.push(batch.commit());
                  batch = firebase.firestore().batch();
                  batchCount = 0;
                }
              }else{
                batch.set(ref.doc(_newId), items[_id]);
                if (++batchCount >= 500) {
                  _arr.push(batch.commit());
                  batch = firebase.firestore().batch();
                  batchCount = 0;
                }
              }
            }
            let rootId = Object.keys(items)[0];
            let newId = "sandbox2";
            idReplaceUpload(rootId,newId);
            _arr.push(batch.commit());
            Promise.all(_arr).then(resolve);
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
