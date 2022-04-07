<template lang="pug">
.molle-editer.bootstrap(:style="style")
  MolleBase
  .molle-editer__fiexd-tl
    a.btn.btn-outline-secondary(href="/--molle/")
      b-icon(icon="house-door")

    button.btn.btn-info(@click="editerToggle")
      span(v-if="$route.query.edit")
        b-icon(icon="display")
      span(v-else)
        b-icon(icon="pencil")

    button.btn.btn-outline-info(@click="openMobileWindow")
      span
        b-icon(icon="phone")

  .molle-editer__body(v-show="$route.query.edit")
    style(v-if="$route.query.edit")
      | @media screen and (min-width: 768px)  {
      | .molle-editer{
      |   height: calc(100% - {{panelOption.top}}px);
      | }
      | .molle-editer + * {
      |   margin-left: {{panelOption.left.value+8}}px;
      |   margin-right: {{panelOption.right.value+8}}px;
      | }
      | }

    // left
    .molle-editer__left.shadow(:style="{width:panelOption.left.value+'px'}")
      .molle-editer__scroll.pb-4.pt-2hr(ref="left")

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
    GoogleStorageModalComp

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
import {INodeObject, IPageData, IItemData} from "../interface";
import {Singleton} from "../Singleton";
import firebase from "firebase";
import ModuleLoaderCms from "../module/ModuleLoaderCms.vue";
import PageListComp from "./PageListComp.vue";
import {MoUtils} from "../MoUtils";
import MolleBase from "./MolleBase.vue";

@Component({
  components: {
    MolleBase,
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

  /**
   *
   **/
  mounted() {
    // 一時的コード
    // Singleton.logsRef.get().then((snap: firebase.firestore.QuerySnapshot) => {
    //   let batchQue: any = [];
    //
    //   snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
    //     let id = _snap.id;
    //     let data: any = _snap.data();
    //
    //     if (data.history) {
    //       for (let item of data.history) {
    //         if(!item.timestamp)continue;
    //         let uniq = item.timestamp.seconds * 1000 + "-" + Math.floor(Math.random() * 1000);
    //         let hoge: any = {};
    //         if (item.update) {
    //           if (item.update.value) hoge.value = item.update.value;
    //           if (item.update.option) hoge.option = item.update.option;
    //           if (item.update.class) hoge.class = item.update.class;
    //           if (item.update.moduleId) hoge.moduleId = item.update.moduleId;
    //           if (item.update.name) hoge.name = item.update.name;
    //         }
    //         let obj = {
    //           id: id,
    //           timestamp: 0,
    //           uid: item.uid,
    //           data: hoge,
    //         };
    //         batchQue.push({
    //           cmd: "set",
    //           ref: Singleton.logsRef.doc(uniq),
    //           data: obj,
    //         });
    //       }
    //     }
    //     // console.log(id, data);
    //   });
    //   console.log(batchQue);
    //   MoUtils.updateBatch(batchQue).then(() => {
    //     alert("complete");
    //   });
    // });

    // pageData
    let id = Singleton.getPageIdByPath(this.$route);
    if (id) {
      Singleton.pagesRef.doc(id)
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            if (confirm(`${id}:ページを作成しますか？`)) {
              this.addPage(id);
            } else {
              // console.log("no page data", this.$route.path, id);
              window.history.go(-1);
            }
            return;
          }
          // console.log(id, snap.data());
          this.$set(this.vobj, "pageId", id);
          this.$set(this.vobj, "pageData", snap.data());
        });
    }

    this.enterFrame();

    let listener = (e: any) => {
      // if (e.type == "click") console.log(e.target);
      if (!this.$route.query.edit) return;

      //set focus
      for (let i = 0; i < e.path.length; i++) {
        let v = e.path[i].__vue__;
        if (v && v instanceof ModuleLoaderCms) {
          let loader: ModuleLoaderCms = v;

          // if Reference
          try {
            //@ts-ignore
            if (loader.$parent.itemData.moduleId == "Reference") {
              //@ts-ignore
              v = loader = loader.$parent.loader;
            }
          } catch (e) {
          }
          //
          let q = {...this.$route.query};
          switch (e.type) {
            case "mouseover":
              q.hover = loader.$props.node.id;
              break;
            case "click":
              q.focus = loader.$props.node.id;
              e.preventDefault();
              break;
          }
          this.$router.replace({query: q}).catch(err => {
          });
          break;
        }
      }
    };
    this.$parent.$el.addEventListener("mouseover", listener);
    this.$parent.$el.addEventListener("click", listener);

    let _check = () => {
      var current = <HTMLElement>document.activeElement;
      return current.tagName == "TEXTAREA" ||
        (current.tagName == "INPUT" && ["text", "url", "number"].includes(current.getAttribute("type")!)) ||
        current.getAttribute("contenteditable") == "true";
    };

    //
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (_check()) return;
      if (e.ctrlKey || e.metaKey) {
        //ctrl + z
        switch (e.code) {
          case "KeyZ":
            if (e.shiftKey) MoUtils.redoHistory(this);
            else MoUtils.undoHistory(this);
            break;
        }
      }
    });

    /**
     * ctrl + c
     */
    document.addEventListener("copy", (e: any) => {
      if (_check() || !this.$route.query.focus) return;

      MoUtils.ls.copyItem.id = <string>this.$route.query.focus;
      MoUtils.ls.copyItem.key = "KeyC";
      MoUtils.lsSave();

      // e.clipboardData.setData("text/plain", this.$route.query.focus);
      // e.preventDefault();
    });

    /**
     * ctrl + x
     */
    document.addEventListener("cut", (e: any) => {
      if (_check() || !this.$route.query.focus) return;

      let id = <string>this.$route.query.focus;
      MoUtils.ls.copyItem.id = id;
      MoUtils.ls.copyItem.key = "KeyX";
      MoUtils.lsSave();

      try {
        let parent: any = ModuleLoaderCms.modules[id].$parent;
        if (parent.itemData.type == "group") {
          alert("カットできません");
          return;
        }
        //カットしたモジュールを親から削除
        let value: any = parent.$parent.itemData.value.filter((via: INodeObject) => via.id != id);
        let update = {value: value};
        MoUtils.updateItem(parent.$parent.node.id, update);
        MoUtils.addHistory("delete",
          parent.$parent.node.id,
          parent.$parent.itemData,
          update,
        );
        // e.clipboardData.setData("text/plain", id);
        // e.preventDefault();
      } catch (e) {
        // console.log(e)
      }
    });

    /**
     * ctrl + v
     */
    document.addEventListener("paste", (e: any) => {
      // console.log(e.clipboardData);
      // console.log(e.clipboardData.getData("text/plain"));
      if (_check() || !this.$route.query.focus) return;

      // let _id = e.clipboardData.getData("text/plain");
      // if (_id && _id == MoUtils.ls.copyItem.id) {
      //   //_idを優先してコピーしてみる
      // }else{
      //   //MoUtils.ls.copyItem.idでやる
      // }

      /**
       * ls
       */
    });
  }

  /**
   *
   */
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
    console.log("onChangeFocusModuleNode", newer);
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
      console.log(e);
    }

    try {
      let current = <HTMLElement>this.$el.nextElementSibling!.querySelector(`[data-item-id="${newer}"]`);
      let top = current.getBoundingClientRect().top;
      let bottom = current.getBoundingClientRect().bottom;
      let v = top;
      if (bottom < h * 0.1 || top > h * 0.9) {
        v -= h * 0.2;
        v += pageYOffset;
        window.scrollTo({top: v, behavior: "smooth"});
      }
    } catch (e) {
      console.log(e);
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

  openMobileWindow() {
    window.open(location.origin + location.pathname + "?mode=sp",
      'MOLLE-SPview',
      'width=380,height=800')
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

  private addPage(pageId: any) {
    let path = decodeURIComponent(pageId);
    //pages作成
    Singleton.pagesRef.doc(pageId).set({
      path: path,
      itemId: pageId,
      // date:
      noExport: !path.indexOf("--no-export/"),
    });
    //items作成
    MoUtils.updateItem(pageId, this.$molleModules.Box.def, true);
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
  &__fiexd-tl {
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

  @include mediaquery-sm {
    display: none !important;
  }
}


#bootstrap-container {
  //z-index: $zindex-modal;
  pointer-events: auto;
}
</style>
