<template lang="pug">
button.btn.btn-info.m-1(
  type="button",
  @click="onExport"
) Export

</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "molle-cms/src/Singleton";
import {IPageData} from "~/src/interface";

@Component({
  components: {},
})
export default class PageExport extends Vue {
  @Prop() pageData!: IPageData;

  private totalCount: number = 0;
  private loopFinishCount: number = 0;
  private obj: any = {
    page: {},
    items: {},
  };

  onExport() {
    // page
    this.obj.page = this.pageData;
    // items
    this.itemsLoop(this.pageData.itemId, () => {
      if (this.totalCount === this.loopFinishCount) {
        this.fileExport();
      }
    });
  }

  itemsLoop(_itemId: any, end: any) {
    this.totalCount++;
    Singleton.itemsRef.doc(_itemId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        this.obj.items[_itemId] = snap.data();
        let itemData: any = snap.data();

        if (itemData.type == "group"
          ||
          (itemData.type == "children" && itemData.value.length > 0)) {
          let count: number = 0;
          for (let i in itemData.value) {
            count++;
            this.itemsLoop(itemData.value[i].id, () => {
              count--;
              if (count == 0) {
                this.loopFinishCount++;
                end();
              }
            });
          }
        } else {
          this.loopFinishCount++;
          end();
        }

      });
  }

  fileExport() {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob(
        [JSON.stringify(this.obj)],
        {type: "application/json"}),
    );
    a.download = `${this.pageData.path}-${this.pageData.title}-${new Date().toUTCString()}.json`;
    a.click();
  }

}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
