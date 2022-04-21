<template lang="pug">
.molle-sys-ui.bootstrap
  MolleBase(v-model="isLogin")
  div.d-flex.flex-nowrap
    div(style="width:210px;z-index:100")
      .container-fluid.position-sticky.pt-3.pb-3(style="top:0")
        h1.text-info.mt-0
          span.text-nowrap MOdular
          span.text-nowrap Light
          span.text-nowrap Layout
          span.text-nowrap Easy
        p.text-info Contents Management System v{{version}}

        hr
        div(v-if="isLogin")
          ul
            li
              a.btn-link(href="#readme")
                b-icon.mr-2(icon="book")
                | {{$words.readme}}
            li(v-for="page in profile.pages")
              a.btn-link(:href="`#${page.id}`")
                b-icon.mr-2(:icon="page.icon")
                | {{page.label}}

          MolleToolbar

    .w-100(v-if="isLogin")
      .container-fluid
        // Read me
        section#readme.mt-1r.mb-6r
          ModuleLoader(:node="{id:'_readme'}")

        //
        section.mt-1r.mb-6r(v-for="page in profile.pages" :id="page.id")
          h2.p-3.mt-0.mb-4.bg-info.text-white
            b-icon.mr-2(:icon="page.icon")
            | {{page.label}}
          .row
            .col
              IndexPageListView(:pages="pages[page.id]")
            .col-4
              IndexPageAddView.position-sticky(
                :prefix="page.prefix"
                :isDateField="page.isDateField"
                :tags="page.tags"
              )

        section#site.mt-1r.mb-6r
          SiteSettingsComp

        section#project.mt-1r.mb-6r
          ProjectSettingsComp

</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "~/molle-cms/src/Singleton";
import {IPageData} from "~/molle-cms/src/interface";
import MolleToolbar from "~/molle-cms/src/ui/MolleToolbar.vue";
import IndexPageListView from "~/molle-cms/src/ui/IndexPageListView.vue";
import IndexPageAddView from "~/molle-cms/src/ui/IndexPageAddView.vue";
import ProjectSettingsComp from "~/molle-cms/src/ui/ProjectSettingsComp.vue";
import SiteSettingsComp from "~/molle-cms/src/ui/SiteSettingsComp.vue";
import MolleBase from "~/molle-cms/src/ui/MolleBase.vue";

@Component({
  components: {MolleBase, IndexPageAddView, SiteSettingsComp, ProjectSettingsComp, IndexPageListView, MolleToolbar},
})
export default class MolleTopPage extends Vue {
  version = process.env.version;

  pages: any = {};
  profile: any = {
    pages: process.env.pages,
  };
  isLogin = false;

  head() {
    return {
      title: "[MOLLE]" + process.env.title,
    };
  }

  @Watch("isLogin", {immediate: true})
  onLogin() {
    if (!this.isLogin) return;
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
      },
    );
  }
}
</script>

<style lang="scss">
.molle-sys-ui {
}
</style>
