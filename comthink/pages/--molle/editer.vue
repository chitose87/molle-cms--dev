<template lang="pug">
div
  .l-molle(v-if="pageData.itemId")
    .l-molle__left.bootstrap.shadow(:style="{width:panelOption.left.value+'px'}")
      .l-molle__scroll.pb-4(ref="left")
        .card.bg-light
          .card-header.pt-1.pb-1.pl-3.pr-3.text-right
            a(href="/--molle/")
              b-icon(icon="house-door")
              span Molle TOP
        ItemListViewComp(:itemId="pageData.itemId")
      .l-molle__side-bar(@mousedown="(e)=>onSidebar(e,'left')")

    .l-molle__main
      component(:is="theme", :pageDataByEditer="pageData" ref="main")

    .l-molle__right.bootstrap.shadow(:style="{width:panelOption.right.value+'px'}")
      .l-molle__scroll
        EditorOptionComp
        PagePropertyComp(:pageData="pageData", :pageId="pageId")
        ModulePropertyComp
      .l-molle__side-bar(@mousedown="(e)=>onSidebar(e,'right')")
    GoogleStorageModalComp(v-if="ready")
  FocusExtension
  #bootstrap-container.bootstrap
</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import {INodeObject, IPageData} from "molle-cms/src/interface";
import {Singleton} from "molle-cms/src/Singleton";
import firebase from "firebase";
import ItemListViewComp from "molle-cms/src/ui/ItemListViewComp.vue";
import ModulePropertyComp from "molle-cms/src/ui/ModulePropertyComp.vue";
import PagePropertyComp from "molle-cms/src/ui/PagePropertyComp.vue";
import UniversalPage from "~/pages/_universal.vue";
import NewsDetailPage from "~/pages/news/_detail.vue";

import EditorOptionComp from "molle-cms/src/ui/EditorOptionComp.vue";
import GoogleStorageModalComp from "molle-cms/src/ui/GoogleStorageModalComp.vue";
import FocusExtension from "molle-cms/src/ui/FocusExtension.vue";
import ModuleLoaderCms from "molle-cms/src/module/ModuleLoaderCms.vue";

@Component({
  components: {
    FocusExtension,
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
  pageId?: string;

  theme: string = "";
  private unsubscribe!: () => void;
  ready: boolean = false;

  panelOption = {
    unsubscribe: () => {
    },
    left: {
      value: 200,
    },
    right: {
      value: 200,
    }
  }

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
        if (v && v instanceof ModuleLoaderCms) {
          let module: ModuleLoaderCms = v;
          this.$router.push({query: {...this.$route.query, hover: module.$props.node.id}});
          break;
        }
      }
    });
    this.$el.addEventListener("click", (e: any) => {
      // console.log(e.path)
      for (let i = 0; i < e.path.length; i++) {
        let v = e.path[i].__vue__;
        if (v && v instanceof ModuleLoaderCms) {
          let loader: ModuleLoaderCms = v;
          this.$router.push({query: {...this.$route.query, focus: loader.$props.node.id}});
          break;
        }
      }
    });
  }

  @Watch('$route.query.focus', {immediate: true})
  onChangeFocusModuleNode(newer: any, older?: any) {
    console.log(newer)
    if (!newer) return
    let h = window.innerHeight;
    try {
      let leftPanel = <HTMLElement>this.$refs.left
      let current = <HTMLElement>leftPanel.querySelector(`[data-item-id="${newer}"]`);
      let v = current.getBoundingClientRect().top;
      if (v < h * 0.1 || v > h * 0.9) {
        v -= h * 0.2;
        v += leftPanel.scrollTop;
        leftPanel.scrollTo({top: v, behavior: "smooth"})
      }
    } catch (e) {
    }

    try {
      let mainPanel = <Vue>this.$refs.main
      let current = <HTMLElement>mainPanel.$el.querySelector(`[data-item-id="${newer}"]`);
      let v = current.getBoundingClientRect().top;
      if (v < h * 0.1 || v > h * 0.9) {
        v -= h * 0.2;
        v += pageYOffset;
        window.scrollTo({top: v, behavior: "smooth"})
      }
    } catch (e) {
    }
  }

  onSidebar(event: MouseEvent, lr: string) {
    //@ts-ignore
    let option = this.panelOption[lr];
    this.panelOption.unsubscribe();

    let flag = true;
    let value = lr == "right" ? window.innerWidth - event.clientX : event.clientX;
    let enter = () => {
      this.$set(option, "value", value > 50 ? value : 0);
      if (flag) requestAnimationFrame(() => enter());
    };
    let move = (e: MouseEvent) => {
      e.preventDefault();
      value = lr == "right" ? window.innerWidth - e.clientX : e.clientX;
    }
    let up = (e?: MouseEvent) => {
      this.panelOption.unsubscribe();
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    enter();

    this.panelOption.unsubscribe = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up);
      flag = false;
    };
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
      position: relative;

      // a,button{
      // pointer-events: none !important;
      // }
    }
  }

  &__left,
  &__right {
    background-color: $color-gray-100;
    height: 100vh;
    //overflow: auto;
    position: sticky;
    top: 0;
    width: 0;
    z-index: $zindex-modal;
    flex-shrink: 0;
    flex-grow: 0;

    @include mediaquery-sm {
      display: none;
    }
  }

  &__scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: $color-gray-100;
  }

  &__side-bar {
    position: absolute;
    width: 1rem;
    height: 100%;
    background-color: $color-black;
    opacity: 0;
    top: 0;
    transition: $tick $easeOut 0s;
    cursor: col-resize;

    &:hover {
      opacity: 0.4;
    }
  }

  &__left {
    .l-molle__side-bar {
      right: -1rem;
    }
  }

  &__right {
    .l-molle__side-bar {
      left: -1rem;
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
