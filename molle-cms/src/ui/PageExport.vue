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
import {Singleton} from "~/molle-cms/src/Singleton";
import {IPageData} from "~/molle-cms/src/interface";

@Component({
  components: {},
})
export default class PageExport extends Vue {
  @Prop() pageData!: IPageData;

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
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
