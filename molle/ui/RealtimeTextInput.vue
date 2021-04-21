<template lang="pug">
.realtime-text-input.bootstrap(v-show="visible" :style="getPosition()")
  #quill-editor
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import Quill from "quill";

@Component({
  components: {},
})
export default class RealtimeTextInput extends Vue {
  itemId: string = "";
  lsStore = lsStore;
  itemData = <IItemData>{};
  targetModule = <Vue>{};
  isInit = false;
  visible = false;

  tagValue = "";
  beforeInputData = "";
  private unsubscribe!: () => void;

  loader?: Vue | null;

  //
  quill!: Quill;
  $editer!: HTMLElement;

  mounted() {
    this.quill = new Quill("#quill-editor", {
      modules: {
        toolbar: [
          ["bold", "underline", "strike", "link", "clean"]
        ]
      },
      theme: "bubble"
    });
    this.quill.on("text-change", (e, old, source) => {
      if (source == "user") this.update()
    });
    this.$editer = <HTMLElement>this.$el.querySelector('.ql-editor');
    window.addEventListener("click", (e: any) => {
      if (!this.loader || !this.visible) return;
      // console.log(e.path,this.loader!.$children[0].$el)
      if (!e.path.some((el: Element) => {
        return el == this.$el || el == this.loader!.$children[0].$el;
      })) {
        console.log("blur");
        this.update(true);
        (<HTMLElement>this.targetModule.$el).style.visibility = "";
        this.visible = false;
        this.loader = null;
      }
    })
  }

  /**
   * from editer.vue
   */
  init(moduleLoader: Vue) {
    if (moduleLoader == this.loader) return;
    if (this.loader) {
      this.update(true);
      (<HTMLElement>this.targetModule.$el).style.visibility = "";
    }
    // this.beforeChange();
    this.loader = moduleLoader;
    this.visible = false;
    this.isInit = false;
    this.tagValue = "";

    let module = moduleLoader.$children[0];
    if (module.$props.itemData.type == "text") {
      this.itemId = moduleLoader.$props.node.id;
      this.targetModule = module;

      this.unsubscribe && this.unsubscribe();
      this.unsubscribe = Singleton.itemsRef
        .doc(this.itemId)
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          this.itemData = <IItemData>snap.data();
          if (!this.isInit) {
            this.tagValue = "<p>" + this.itemData.value.replace(/<br>/g, "</p><p>") + "</p>";
            (<HTMLElement>this.targetModule.$el).style.visibility = "hidden";
            this.visible = true;
            this.isInit = true;
            this.$editer.innerHTML = this.tagValue;
          } else {
            //todo ather update
          }
          this.updateStyle();
          //.replace(/<br[\s]*\/?[\s]*>/g, "\n");
        })
    }
  }

  update(isFix = false) {
    let rows: any[] = [];
    let loop = (children: any) => {
      if (children.length) {
        children.forEach((child: any) => {
          let str = child.innerHTML || child.outerHTML || child;
          rows.push(str == "<br>" ? "" : str);
        })
      }
    };
    loop(this.$editer.children);

    if (isFix) {//空の行を削除
      rows = rows.filter(v => v != "<br>" && v)
    }
    let str = rows.join("<br>");
    if (isFix) {//shift + enter killer
      str = str.replace(/(<br>)+/g, "<br>");
    }

    if (str != this.itemData.value) {
      Singleton.itemsRef.doc(this.itemId).update({
        value: str,
        updateTime: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }

  getPosition() {
    try {
      let el = <HTMLElement>this.targetModule.$el;
      let obj: any = {
        "top": el.offsetTop + "px",
        "left": el.offsetLeft + "px",
        "width": el.clientWidth + "px"
      };
      // console.log(obj)
      return obj;
    } catch (e) {
      return {}
    }
  }

  private updateStyle() {
    let style: any = getComputedStyle(this.targetModule.$el);
    let $el: any = this.$el.querySelector('.ql-editor')!;

    for (let i = 0; i < style.length; i++) {
      let attr = style[i];
      switch (true) {
        case /.*margin.*/.test(attr):
        case /.*padding.*/.test(attr):
        case /.*font.*/.test(attr):
        case /.*color.*/.test(attr):
        case /line-height/.test(attr):
        case /letter-spaceing/.test(attr):
          $el.style[attr] = style[attr]
      }
    }
  }

  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
}
</script>

<style lang="scss">
@import 'quill/dist/quill.bubble.css';

.realtime-text-input {
  position: absolute;
  z-index: $zindex-on;
  margin: -0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: $shadow;
  background-color: rgba($color-white, 0.5);

  .ql-editor {
    margin-bottom: 0 !important;
  }
}
</style>
