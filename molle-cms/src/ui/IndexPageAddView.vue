<template lang="pug">
.card
  .card-header
    h3.mt-0
      b-icon(icon="file-earmark-plus")
      | {{$words.add}}
  .card-body
    p(v-if="isDateField")
      label.form-inline
        span.mr-2 日付:
        input.form-control(type="date", v-model="dataObj.date")
    p
      label.form-inline
        span.mr-2 ディレクトリ指定:
        input.form-control(
          type="text",
          v-model="dataObj.id",
        )
    p(v-if="tags")
      label.form-inline
        span.mr-2 タグ:
        select.form-control(v-model="dataObj.option.tag")
          option(
            v-for="item in tags"
            :value="Object.keys(item)[0]"
            v-html="item[Object.keys(item)[0]]"
          )
    p
      label.form-inline
        span.mr-2 Box id (Option):
        input.form-control(type="text", v-model="dataObj.itemId")

    p
      label.w-100.mr-2
        span タイトル:
        input.form-control(type="text", v-model="dataObj.title")
    p.mb-1
      span.mr-2 生成Path :
      span /{{prefix + (dataObj.id || dataObj.date || "***")}}

    button.btn.btn-primary.btn-block(
      type="button",
      :disabled="dataObj.date === '' && dataObj.id === ''",
      @click="add"
    ) {{$words.add}}

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IPageData} from "../interface";
import {Singleton} from "../Singleton";
import {Utils} from "../Utils";

@Component({
  components: {},
})
export default class IndexPageAddView extends Vue {
  dataObj = {
    id: "",
    date: "",
    title: "",
    itemId: "",
    option: {},
  };

  @Prop({default: ""}) prefix!: string;
  @Prop({default: false}) isDateField!: boolean;
  @Prop() tags?: any[];

  created() {
  }

  mounted() {
  }

  /**
   *
   */
  add() {
    let path = this.prefix + (this.dataObj.id || this.dataObj.date);
    let pageId = encodeURIComponent(path);
    let itemId = this.dataObj.itemId || pageId;
    Singleton.pagesRef.doc(pageId).set({
      path: path,
      itemId: itemId,
      title: this.dataObj.title,
      date: this.dataObj.date,
      noExport: this.prefix == "_no-export/",
    });
    Utils.updateItem(itemId, this.$molleModules.Box.def, true);
    window.open("/" + this.prefix + (this.dataObj.id || this.dataObj.date) + "?edit=true", "_blank");
  }
}
</script>

<style lang="scss">
.item-list-view-comp {
}
</style>
