<template lang="pug">
div
  .l-molle(v-if="pageData.itemId")
    .l-molle__left.bootstrap.shadow(:aria-expanded="expandedLeft")
      button.btn.btn-outline-secondary.l-molle__toggle(
        @click="() => (expandedLeft = !expandedLeft)"
      )
        b-icon(icon="layout-sidebar-inset")

      .card.bg-light
        .card-header.pt-1.pb-1.pl-3.pr-3.text-right
          a(href="/--molle/")
            b-icon(icon="house-door")
            span Molle TOP
      ItemListViewComp(:itemId="pageData.itemId")

    .l-molle__main(ref="main")
      component(:is="theme", :pageDataByEditer="pageData")

    .l-molle__right.bootstrap.shadow(:aria-expanded="expandedRight")
      button.btn.btn-outline-secondary.l-molle__toggle(
        @click="() => (expandedRight = !expandedRight)"
      )
        b-icon(icon="layout-sidebar-inset-reverse")

      EditorOptionComp
      PagePropertyComp(:pageData="pageData", :pageId="pageId")
      ModulePropertyComp
    GoogleStorageModalComp(v-if="ready")
  #bootstrap-container.bootstrap
</template>

<script lang="ts">
import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import {IPageData} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import ItemListViewComp from "~/molle/ui/ItemListViewComp.vue";
import ModulePropertyComp from "~/molle/ui/ModulePropertyComp.vue";
import {lsStore} from "~/utils/store-accessor";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import PagePropertyComp from "~/molle/ui/PagePropertyComp.vue";
import UniversalPage from "~/pages/_universal.vue";
import NewsDetailPage from "~/pages/news/_detail.vue";

import EditorOptionComp from "~/molle/ui/EditorOptionComp.vue";
import GoogleStorageModalComp from "~/molle/ui/GoogleStorageModalComp.vue";

@Component({
  components: {
    GoogleStorageModalComp,
    UniversalPage,
    NewsDetailPage,
    PagePropertyComp,
    ModulePropertyComp,
    ItemListViewComp,
    EditorOptionComp,
  },
})
export default class MolleEditerPage extends Vue {
  pageData: IPageData = <IPageData>{};
  expandedLeft = true;
  expandedRight = true;
  pageId?: string;

  theme: string = "";
  private unsubscribe!: () => void;
  ready: boolean = false;

  head() {
    return {
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/jimp/0.16.1/jimp.js"
      }]
    }
  }

  created() {
    Singleton.firebaseInit(() => {
      this.pageId = <string>this.$route.query.pageId;
      this.unsubscribe = firebase
        .firestore()
        .doc(`${Singleton.prefix}/pages/${this.pageId}`)
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            console.log("no page data");
            return;
          }
          let pageData = <IPageData>snap.data();

          lsStore.init();
          //theme set
          if (pageData.path.indexOf("news/") == 0) {
            this.$set(this, "theme", "NewsDetailPage");
            // } else if (pageData.path.indexOf("case-study/") == 0) {
            //   this.$set(this, "theme", "CaseStudyDetailPage");
          } else {
            this.$set(this, "theme", "UniversalPage");
          }

          console.log(pageData)
          this.$set(this, "pageData", pageData);
        });
    });

    //check ready
    let clearId = setInterval(() => {
      //@ts-ignore
      if (window["Jimp"] && true) {
        this.ready = true;
        clearInterval(clearId);
      }
    }, 100);
  }

  mounted() {
    this.$el.addEventListener("mouseover", (e: any) => {
      for (let i = 0; i < e.path.length; i++) {
        let v = e.path[i].__vue__;
        if (v && v instanceof ModuleLoader) {
          let module: ModuleLoader = v;
          lsStore.update({key: "hoverModuleNode", value: module.$props.node});
          break;
        }
      }
    });
    this.$el.addEventListener("click", (e: any) => {
      for (let i = 0; i < e.path.length; i++) {
        let v = e.path[i].__vue__;
        if (v && v instanceof ModuleLoader) {
          let module: ModuleLoader = v;
          console.log(module.$props.node)
          lsStore.update({key: "focusModuleNode", value: module.$props.node});
          break;
        }
      }
    });
  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
}
</script>

<style lang="scss">
.l-molle {
  @include mediaquery-not-sm {
    display: flex;

    &__main {
      flex: 1;
      overflow: hidden;

      // a,button{
      // pointer-events: none !important;
      // }
    }
  }

  &__left,
  &__right {
    background-color: $color-gray-100;
    height: 100vh;
    overflow: auto;
    position: sticky;
    top: 0;
    width: 0;
    z-index: $zindex-modal;
    flex-shrink: 0;
    flex-grow: 0;

    &[aria-expanded="true"] {
      min-width: 200px;
      max-width: 200px;
    }

    @include mediaquery-sm {
      display: none;
    }
  }

  &__toggle {
    position: fixed;
    top: 0rem;
    z-index: $zindex-modal;
  }

  &__left {
    .l-molle__toggle {
      left: 0rem;
    }
  }

  &__right {
    .l-molle__toggle {
      right: 0rem;
    }
  }

  //.u_auto-input
  .u_auto-input {
    position: relative;
    display: inline-block;

    &__static {
      visibility: hidden;
      text-indent: 0.5em;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
    }
  }
}
</style>
