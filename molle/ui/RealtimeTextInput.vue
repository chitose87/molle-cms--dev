<template lang="pug">
.realtime-text-input(v-show="flag")
  #quill-editor
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemData, INodeObject} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
//@ts-ignore
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
  flag = false;

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

    // 入力
    this.quill.on("text-change", (e: any, old: any, source: string) => {
      if (source == "user") {
        //@ts-ignore
        this.focusExtension.loader.$el.style.height = this.$editer.clientHeight + "px";
        this.focusExtension.updateStyle();
      }
    });
    this.$editer = <HTMLElement>this.$el.querySelector('.ql-editor');

    // 対象が変更されるまえ
    this.$parent.$on("beforeUpdate", () => {
      if (this.focusExtension.itemData.type != "text") return;
      console.log("blur", "beforeUpdate")
      this.blur();

    });

    // 初期化
    this.$parent.$on("initialized", () => {
      if (this.focusExtension.itemData.type != "text") return;
      this.flag = true;
      //@ts-ignore
      this.focusExtension.loader.$el.style.visibility = "hidden";
      this.update();
    });

    // itemdataの更新
    this.$parent.$on("update", () => {
      if (this.focusExtension.itemData.type != "text") return;
      console.log("update", "update")
      this.update();
    });

    //blur
    window.addEventListener("click", (e: any) => {
      if (this.focusExtension.itemData.type != "text") return;
      if (!e.path.some((el: Element) => {
        return el == this.$el || el == this.focusExtension.loader!.$children[0].$el;
      })) {
        console.log("blur", "click")
        this.blur();
      }
    });

    //再起動時
    if (this.focusExtension.itemData.type == "text") {
      console.log("update", "再起動時")
      this.update();
    }
  }

  /**
   * 反映
   */
  private update(forceStr?: string) {
    this.tagValue = "<p>" + (forceStr || this.focusExtension.itemData.value).replace(/<br>/g, "</p><p>") + "</p>";
    this.$editer.innerHTML = this.tagValue;

    this.updateStyle();
  }

  /**
   * 保存・確定
   */
  private blur() {
    // console.trace("blur")
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

    //空の行を削除
    rows = rows.filter(v => v != "<br>" && v)
    let str = rows.join("<br>");
    //shift + enter killer
    str = str.replace(/(<br>)+/g, "<br>");

    if (str != this.focusExtension.itemData.value) {
      Singleton.itemsRef.doc(this.focusExtension.itemId).update({
        value: str,
        updateTime: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    //@ts-ignore
    this.focusExtension.loader.$el.style.height = "";
    //@ts-ignore
    this.focusExtension.loader.$el.style.visibility = "";
    this.flag = false;
  }

  /**
   * スタイルを反映する
   * @private
   */
  private updateStyle() {
    let style: any = getComputedStyle(this.focusExtension.loader.$el);
    let $el: any = this.$el.querySelector('.ql-editor')!;

    for (let i = 0; i < style.length; i++) {
      let attr = style[i];
      switch (true) {
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
