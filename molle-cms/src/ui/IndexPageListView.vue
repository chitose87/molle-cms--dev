<template lang="pug">
ul.list-group
  li.list-group-item.list-group-item-action.d-flex.justify-content-between(
    v-for="(item, key) in pages"
  )

    NuxtLink.mr-2(
      :to="{path: '/'+item.path, query: {edit: 'true'}}"
    )
      span(v-html="item.path")
      b-icon(icon="chevron-right")

    span.mr-2.ml-auto(v-html="item.title || '{no title}'")
    div(v-if="item.date")
      span.mr-2 :
      span.mr-2(v-html="item.date")

    label.small.form-inline.mr-2
      input.form-control.form-control-sm(
        v-model="item.noExport",
        type="checkbox",
        @change="updatePage(key,item)"
      )
      span :{{$words.donotExport}}

    button.btn.btn-danger.btn-sm(
      type="button",
      @click="deletePage(key)"
    ) {{$words.delete}}

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IPageData} from "../interface";
import {Singleton} from "../Singleton";

@Component({
  components: {}
})
export default class IndexPageListView extends Vue {
  @Prop() pages!: {[key: string]: IPageData};

  created() {
  }

  mounted() {
  }
  updatePage(id: string, item: IPageData) {
    Singleton.pagesRef.doc(id).update(item);
  }
  deletePage(id: string) {
    Singleton.pagesRef.doc(id).delete();
  }
}
</script>

<style lang="scss">
.item-list-view-comp {
}
</style>
