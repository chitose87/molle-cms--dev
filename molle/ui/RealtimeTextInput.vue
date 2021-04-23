<template lang="pug">
.realtime-text-input
  #quill-editor
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemData, INodeObject} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import Quill from "quill";
import FocusExtension from "~/molle/ui/FocusExtension.vue";

@Component({
  components: {},
})
export default class RealtimeTextInput extends Vue {
  tagValue = "";
  quill!: Quill;
  $editer!: HTMLElement;
  focusExtension!: FocusExtension;

  mounted() {
    this.focusExtension = <FocusExtension>this.$parent;
    this.quill = new Quill("#quill-editor", {
      modules: {
        toolbar: [
          ["bold", "underline", "strike", "link", "clean"]
        ]
      },
      theme: "bubble"
    });
    delete this.quill.getModule('keyboard').bindings["9"];//tab

    this.quill.on("text-change", (e, old, source) => {
      if (source == "user") {
        this.update();
      }
    });
    this.$editer = <HTMLElement>this.$el.querySelector('.ql-editor');

    this.$parent.$on("initialized", () => {
      if (this.focusExtension.itemData.type != "text") return;
      this.init()
    });
    // itemData等が更新されるまえ
    this.$parent.$on("beforeUpdate", () => {
      if (this.focusExtension.itemData.type != "text") return;
      this.update(true);
    });

    // itemdataの更新
    this.$parent.$on("update", () => {
      if (this.focusExtension.itemData.type != "text") return;
      this.updateStyle();
    });

    //blur
    window.addEventListener("click", (e: any) => {
      if (this.focusExtension.itemData.type != "text") return;
      if (!e.path.some((el: Element) => {
        return el == this.$el || el == this.focusExtension.loader!.$children[0].$el;
      })) {
        console.log("blur");
        this.init(this.update(true));
      }
    });

    //再起動時
    if (this.focusExtension.itemData.type == "text") {
      this.init();
    }
  }

  private init(forceStr?: string) {
    this.tagValue = "<p>" + (forceStr || this.focusExtension.itemData.value).replace(/<br>/g, "</p><p>") + "</p>";
    this.$editer.innerHTML = this.tagValue;
    this.updateStyle();
  }

  private update(isFix = false) {
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

    if (str != this.focusExtension.itemData.value) {
      Singleton.itemsRef.doc(this.focusExtension.itemId).update({
        value: str,
        updateTime: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    return str;
  }

  private updateStyle() {
    let style: any = getComputedStyle(this.focusExtension.targetModule.$el);
    let $el: any = this.$el.querySelector('.ql-editor')!;

    for (let i = 0; i < style.length; i++) {
      let attr = style[i];
      switch (true) {
        // case /.*margin.*/.test(attr):
        case /.*padding.*/.test(attr):
        case /.*font.*/.test(attr):
        case /.*color.*/.test(attr):
        case /.*text.*/.test(attr):
        case /line-height/.test(attr):
        case /letter-spaceing/.test(attr):
          $el.style[attr] = style[attr]
      }
    }
  }
}
</script>

<style lang="scss">
@import 'quill/dist/quill.bubble.css';

.realtime-text-input {
  margin: -0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: $shadow;
  background-color: rgba($color-white, 0.5);
  pointer-events: all;

  .ql-editor {
    margin-bottom: 0 !important;
  }
}
</style>
