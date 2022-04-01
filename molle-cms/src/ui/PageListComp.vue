<template lang="pug">
.page-list-comp
  .card.bg-light
    .card-header.pt-1.pb-1.pl-3.pr-3(@click="expand.all=!expand.all") {{$words.page}} {{$words.list}}
      b-icon(:icon="expand.all?'chevron-up':'chevron-down'")
    .card-body.p-0.pb-3(v-if="expand.all")
      //
      div(v-for="page in profile.pages")
        button.btn.btn-sm.btn-link.btn-block.text-left(@click="$set(expand, page.id, !expand[page.id])")
          b-icon.mr-2(:icon="page.icon")
          | {{page.label}}
          b-icon(:icon="expand[page.id]?'chevron-up':'chevron-down'")
        .item-list-item-comp.list-group-item.p-0.pl-2.pb-3.border-right-0(v-if="expand[page.id]")
          .item-list-item-comp.list-group-item.list-group-item-action.p-0(
            v-for="(item, key) in pages[page.id]"
          )
            NuxtLink.btn.btn-sm.btn-link.btn-block.text-left(
              :to="{path: '/'+item.path, query: {edit: 'true'}}"
            )
              b-icon.ml-n1.mr-1(icon="window")
              b(v-html="item.path")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "../Singleton";
import {IPageData} from "../interface";

@Component({
  components: {},
})
export default class PageListComp extends Vue {
  pages: any = {};
  profile: any = {
    pages: process.env.pages,
  };

  expand: any = {
    all: false,
  };
  inited = false;

  @Watch("expand.all")
  flagChange() {
    if (!this.inited && this.expand.all) {
      this.inited = true;
      Singleton.pagesRef.onSnapshot(
        (snap: firebase.firestore.QuerySnapshot) => {
          let pages: any = {
            universal: {},
          };

          snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
            let pageData = <IPageData>_snap.data();

            let flag = true;
            for (let page of this.profile.pages) {
              if (!page.prefix) continue;
              if (pageData.path.includes(page.prefix, 0)) {
                if (!pages[page.id]) pages[page.id] = {};
                pages[page.id][_snap.id] = pageData;

                flag = false;
                break;
              }
            }
            if (flag) {
              pages.universal[_snap.id] = pageData;
            }
          });
          this.$set(this, "pages", pages);
        });
    }
  }
}
</script>

<style lang="scss">
.page-list-comp {
}
</style>
