<template lang="pug">
.molle-editer.bootstrap(:style="style")
  button.molle-editer__toggle.btn.btn-info(
    @click="editerToggle"
  )
    span(v-if="$route.query.edit") {{$words.preview}}
    span(v-else) Molle TOP

  .molle-editer__body(v-show="$route.query.edit && $route.query.hidden !== 'true'")
    style(v-if="$route.query.edit")
      | .molle-editer{
      |   height: calc(100% - {{panelOption.top}}px);
      | }
      | .molle-editer + * {
      |   margin-left: {{panelOption.left.value+8}}px;
      |   margin-right: {{panelOption.right.value+8}}px;
      | }

    // left
    .molle-editer__left.shadow(:style="{width:panelOption.left.value+'px'}")
      .molle-editer__scroll.pb-4(ref="left")
        .card.bg-light
          .card-header.pt-1.pb-1.pl-3.pr-3.text-right
            a(href="/--molle/")
              b-icon(icon="house-door")
              span {{$words.molleTop}}

        PageListComp

        PagePropertyComp(
          v-if="vobj.pageData && vobj.pageId"
          :pageData="vobj.pageData", :pageId="vobj.pageId"
        )

        .card.bg-light
          .card-header.pt-1.pb-1.pl-3.pr-3 {{$words.structure}}
          ItemListViewComp(
            v-if="vobj.pageData"
            :itemId="vobj.pageData.itemId"
          )
          ItemListViewComp(
            v-for="(loader,id) in moduleLoaderCms.modules"
            v-if="loader.isRoot"
            :itemId="id"
            :key="id"
          )
      .molle-editer__side-bar(@mousedown="(e)=>onSidebar(e,'left')")

    // right
    .molle-editer__right.shadow(:style="{width:panelOption.right.value+'px'}")
      .molle-editer__scroll
        EditorOptionComp

        ModulePropertyComp
      .molle-editer__side-bar(@mousedown="(e)=>onSidebar(e,'right')")
    GoogleStorageModalComp(v-if="ready")

    FocusExtension
    #bootstrap-container
</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import FocusExtension from "./FocusExtension.vue";
import GoogleStorageModalComp from "./GoogleStorageModalComp.vue";
import PagePropertyComp from "./PagePropertyComp.vue";
import ModulePropertyComp from "./ModulePropertyComp.vue";
import ItemListViewComp from "./ItemListViewComp.vue";
import EditorOptionComp from "./EditorOptionComp.vue";
import {INodeObject, IPageData} from "../interface";
import {Singleton} from "../Singleton";
import firebase from "firebase";
import ModuleLoaderCms from "../module/ModuleLoaderCms.vue";
import PageListComp from "./PageListComp.vue";

@Component({
  components: {
    PageListComp,
    FocusExtension,
    GoogleStorageModalComp,
    PagePropertyComp,
    ModulePropertyComp,
    ItemListViewComp,
    EditorOptionComp,
  },
})
export default class MolleEditerComp extends Vue {
  style: any = {};

  theme: string = "";
  private unsubscribe!: () => void;
  ready: boolean = false;

  vobj = <{
    pageData: IPageData,
    pageId: string;
  }>{};

  panelOption = {
    unsubscribe: () => {
    },
    top: 0,
    // height: 100,
    left: {
      value: 200,
    },
    right: {
      value: 200,
    },
  };

  moduleLoaderCms = ModuleLoaderCms;

  mounted() {
    // pageData
    let id = Singleton.getPageIdByPath(this.$route);
    if (id) {
      Singleton.pagesRef.doc(id)
        .get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            console.log("no page data", this.$route.path, id);
            return;
          }
          // console.log(id, snap.data());
          this.$set(this.vobj, "pageId", id);
          this.$set(this.vobj, "pageData", snap.data());
        });
    }

    this.enterFrame();

    //check ready
    let clearId = setInterval(() => {
      //@ts-ignore
      if (window["Jimp"] && true) {
        this.ready = true;
        clearInterval(clearId);
      }
    }, 100);

    let listener = (e: any) => {
      if (e.type == "click") console.log(e.target);
      for (let i = 0; i < e.path.length; i++) {
        let v = e.path[i].__vue__;
        if (v && v instanceof ModuleLoaderCms) {
          let loader: ModuleLoaderCms = v;
          let q = {...this.$route.query};
          if (e.type == "mouseover") {
            q.hover = loader.$props.node.id;
          } else if (e.type == "click") {
            q.focus = loader.$props.node.id;
          }
          this.$router.replace({query: q}).catch(err => {
          });
          break;
        }
      }
    };
    this.$parent.$el.addEventListener("mouseover", listener);
    this.$parent.$el.addEventListener("click", listener);
  }

  private enterFrame() {
    try {
      // let el = <HTMLElement>document.querySelector(".molle-editer + *");
      let v = this.$el.getBoundingClientRect().top;
      if (this.panelOption.top != v) {
        this.$set(this.panelOption, "top", v);
      }
    } catch (e) {
    }

    setTimeout(() => this.enterFrame(), Math.floor(1000 / 10));
  }


  /**
   * 自動スクロール
   * @param newer
   * @param older
   */
  @Watch("$route.query.focus", {immediate: true})
  onChangeFocusModuleNode(newer: any, older?: any) {
    // console.log(newer);
    if (!newer) return;
    let h = window.innerHeight;
    try {
      let leftPanel = <HTMLElement>this.$refs.left;
      let current = <HTMLElement>leftPanel.querySelector(`[data-item-id="${newer}"]`);
      let v = current.getBoundingClientRect().top;
      if (v < h * 0.1 || v > h * 0.9) {
        v -= h * 0.2;
        v += leftPanel.scrollTop;
        leftPanel.scrollTo({top: v, behavior: "smooth"});
      }
    } catch (e) {
    }

    try {
      let mainPanel = <Vue>this.$refs.main;
      let current = <HTMLElement>mainPanel.$el.querySelector(`[data-item-id="${newer}"]`);
      let v = current.getBoundingClientRect().top;
      if (v < h * 0.1 || v > h * 0.9) {
        v -= h * 0.2;
        v += pageYOffset;
        window.scrollTo({top: v, behavior: "smooth"});
      }
    } catch (e) {
    }
  }

  /**
   *
   */
  editerToggle() {
    let q: any = {query: {...this.$route.query}};
    if (this.$route.query.edit) {
      delete q.query.edit;
    } else {
      q.query.edit = true;
    }
    this.$router.push(q);
  }

  /**
   *
   * @param event
   * @param lr
   */
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
    };
    let up = (e?: MouseEvent) => {
      this.panelOption.unsubscribe();
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    enter();

    this.panelOption.unsubscribe = () => {
      window.removeEventListener("mousemove", move);
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
.molle-editer {
  position: fixed;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: $zindex-heaven;

  //@include mediaquery-not-sm {
  //  display: flex;
  //}
  &__toggle {
    position: absolute;
    left: 0rem;
    top: 0rem;
    z-index: $zindex-modal + 1;
    pointer-events: auto;
  }

  &__body {

  }

  &__left,
  &__right {
    background-color: $color-gray-100;
    height: 100%;
    //overflow: auto;
    position: absolute;
    top: 0;
    width: 0;
    z-index: $zindex-modal;
    flex-shrink: 0;
    flex-grow: 0;
    pointer-events: auto;

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
    left: 0;
  }

  &__left &__side-bar {
    right: -1rem;
  }

  &__right {
    right: 0;
  }

  &__right &__side-bar {
    left: -1rem;
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
  @include mediaquery-sm{
    display: none !important;
  }
}


#bootstrap-container {
  //z-index: $zindex-modal;
  pointer-events: auto;
}
</style>
