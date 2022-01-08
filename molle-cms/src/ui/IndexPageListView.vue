<template lang="pug">
table.item-list-view-comp
  thead
    tr
      th(scope="col") Path
      th(scope="col") Title
      th(scope="col")
      th(scope="col") {{$words.donotExport}}
      th(scope="col") {{$words.delete}}

  tbody
    tr(
      v-for="(item, key) in pages"
    )
      th(scope="row")
        a.mr-2(
          :href="'/'+item.path+'?edit=true'"
        )
          span(v-html="item.path")
          b-icon(icon="chevron-right")
      td
        span.mr-2.ml-auto(v-html="item.title || '{no title}'")
      td
        div(v-if="item.date")
          span.mr-2 :
          span.mr-2(v-html="item.date")
      td
        label.small.form-inline.justify-content-center
          input.form-control.form-control-sm(
            v-model="item.noExport",
            type="checkbox",
            @change="updatePage(key,item)"
          )
      td.text-center
        button.btn.btn-danger.btn-sm(
          type="button",
          @click="deletePage(key)"
        ) {{$words.delete}}
  //ul.list-group
  //  li.list-group-item.list-group-item-action.d-flex.justify-content-between(
  //    v-for="(item, key) in pages"
  //  )
  //    a.mr-2(
  //      :href="'/'+item.path+'?edit=true'"
  //    )
  //      span(v-html="item.path")
  //      b-icon(icon="chevron-right")
  //
  //    span.mr-2.ml-auto(v-html="item.title || '{no title}'")
  //    div(v-if="item.date")
  //      span.mr-2 :
  //      span.mr-2(v-html="item.date")
  //
  //    label.small.form-inline.mr-2
  //      input.form-control.form-control-sm(
  //        v-model="item.noExport",
  //        type="checkbox",
  //        @change="updatePage(key,item)"
  //      )
  //      span :{{$words.donotExport}}
  //
  //    button.btn.btn-danger.btn-sm(
  //      type="button",
  //      @click="deletePage(key)"
  //    ) {{$words.delete}}

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IPageData} from "../interface";
import {Singleton} from "../Singleton";

@Component({
  components: {},
})
export default class IndexPageListView extends Vue {
  @Prop() pages!: { [key: string]: IPageData };

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
  width: 100%;
  thead{
    border-bottom: 1px solid $color-border;
  }

  tbody {
    tr {
      &:nth-child(2n) {
        background-color: $color-gray-100;
      }
    }
    th{
      padding: 0.5rem;
    }
  }
}
</style>
