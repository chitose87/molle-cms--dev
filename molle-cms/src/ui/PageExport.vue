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

@Component({
  components: {},
})
export default class PageExport extends Vue {
  @Prop() itemId!: any;

  private totalCount: number = 0;
  private loopFinishCount: number = 0;
  private obj: any = {items: {}};

  onExport() {
    Singleton.pagesRef.doc(this.itemId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
          let obj: any = {pages: {}};
          obj.pages[this.itemId] = snap.data();
          let a = document.createElement("a");
          a.href = URL.createObjectURL(
            new Blob(
              [JSON.stringify(obj)],
              {type: "text/plain"},
            ),
          );
          a.download = `pages-${new Date().toUTCString()}.json`;
          a.click();
        },
      );

    // items
    this.itemsExport();
  }

  loop(parent: any, index: number, end: any) {
    this.totalCount++;
    Singleton.itemsRef.doc(parent.value[index].id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        this.obj.items[parent.value[index].id] = snap.data();
        let itemData: any = snap.data();

        if (itemData.type == "children" && itemData.value.length > 0) {
          let count: number = 0;
          let n: number;
          for (let i in itemData.value) {
            n = Number(i);
            count++;
            this.loop(itemData, n, () => {
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
      })
  }

  itemsExport() {
    Singleton.itemsRef.doc(this.itemId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        this.obj.items[this.itemId] = snap.data();

        if (this.obj.items[this.itemId].value.length > 0) {
          let n: number;
          for (let i in this.obj.items[this.itemId].value) {
            n = Number(i);
            this.loop(this.obj.items[this.itemId], n, () => {
              if (this.totalCount === this.loopFinishCount) {
                this.itemsDownload();
              }
            });
          }
        } else {
          this.itemsDownload();
        }
      })
  }

  itemsDownload() {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob(
        [JSON.stringify(this.obj)],
        {type: "application/json"}),
    );
    a.download = `items-${new Date().toUTCString()}.json`;
    a.click();
  }

}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
