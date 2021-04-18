<template lang="pug">
.realtime-text-input.bootstrap(v-if="visible" :style="getPosition()")
  p(v-html="tagValue" contenteditable :style="getStyle()" @input="onInput" @focusout="onFocusout" ref="edit")
  .realtime-text-input__tool
    button.btn.btn-sm.btn-light(@click="setLink")
      b-icon(icon="link")
    button.btn.btn-sm.btn-light(@click="setBold")
      b-icon(icon="type-bold")
    button.btn.btn-sm.btn-light(@click="setClear")
      b-icon(icon="x")
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";

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

  loader?: Vue;

  /**
   * from editer.vue
   */
  init(moduleLoader: Vue) {
    if (moduleLoader == this.loader) return;
    this.beforeChange();
    this.loader = moduleLoader;
    this.visible = false;
    this.isInit = false;
    this.tagValue = "";

    this.itemId = moduleLoader.$props.node.id;
    let module = moduleLoader.$children[0];
    if (module.$props.itemData.type == "text") {
      this.targetModule = module;

      this.unsubscribe && this.unsubscribe();
      this.unsubscribe = Singleton.itemsRef
        .doc(this.itemId)
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          this.itemData = <IItemData>snap.data();
          if (!this.isInit) {
            this.tagValue = "<div>" + this.itemData.value.replace(/<br>/g, "</div><div>") + "</div>";
            (<HTMLElement>this.targetModule.$el).style.visibility = "hidden";
            this.visible = true;
            this.isInit = true;
          } else {
            //todo ather update
          }
          //.replace(/<br[\s]*\/?[\s]*>/g, "\n");
        })
    }
  }

  /**
   *
   * @param e
   */
  onInput(e: InputEvent) {
    let str = e.data || "";
    // let $edit = <HTMLElement>this.$refs.edit;
    console.log(e);
    if (
      (e.isComposing && this.beforeInputData == str) //マルチバイト
      || /\s/.test(str) || str == "" //space or enter?
    ) {
      this.updata();
    }

    this.beforeInputData = str;
  }

  /**
   *
   */
  onFocusout() {
    console.log("onFocusout");
    this.beforeChange();
    this.loader = undefined;
    this.visible = false;
  }

  /**
   *
   */
  beforeChange() {
    if (!this.targetModule.$el) return;
    console.log("beforeChange");
    (<HTMLElement>this.targetModule.$el).style.visibility = "";
    this.updata(true);
  }

  /**
   *
   */
  updata(isFix: boolean = false) {
    let $edit = <HTMLElement>this.$refs.edit;
    if (!$edit) return;

    let rows = $edit.innerHTML
      .replace(/<div>/g, "")
      .split(/<br><\/div>|<br>|<\/div>/);

    // let rows: any[] = [];
    // let loop = (children: any) => {
    //   if (children.length) {
    //     //childrenじゃだめ説
    //     children.forEach((child: any) => {
    //       console.log(child)
    //       let str = child.innerHTML || child.outerHTML || child;
    //       // let str = child instanceof HTMLDivElement ? child.innerHTML : child.outerHTML;
    //       rows.push(str == "<br>" ? "" : str);
    //     })
    //   }
    // };
    // loop($edit.children);

    if (isFix) {//空の行を削除
      rows = rows.filter(v => v != "<br>" && v)
    }
    let str = rows.join("<br>");
    if (isFix) {//shift + enter killer
      str = str.replace(/(<br>)+/g, "<br>");
    } else {
      str += "<br>";
    }
    if (str != this.itemData.value) {
      console.log("save");
      Singleton.itemsRef.doc(this.itemId).update({
        value: str,
        updateTime: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }

  private getSelect() {
    let v = getSelection();
    console.log(v);
  }

  setBold() {
    this.getSelect();
  }

  setLink() {
    this.getSelect();

  }

  setClear() {

  }

  getPosition() {
    let obj: any = {
      "top": (<HTMLElement>this.targetModule.$el).offsetTop + "px",
      "left": (<HTMLElement>this.targetModule.$el).offsetLeft + "px",
    };
    // console.log(obj)
    return obj;
  }

  getStyle() {
    let obj: any = {};
    let style: any = getComputedStyle(this.targetModule.$el);

    for (let i = 0; i < style.length; i++) {
      let attr = style[i];
      switch (true) {
        case /.*margin.*/.test(attr):
        case /.*padding.*/.test(attr):
        case /.*font.*/.test(attr):
        case /.*color.*/.test(attr):
        case /.*display.*/.test(attr):
        case /line-height/.test(attr):
        case /letter-spaceing/.test(attr):
        case /width/.test(attr):
          obj[attr] = style[attr];
      }
    }
    //@ts-ignore
    window.targetModule = this.targetModule;
    // console.log(style);
    return obj;
  }


  beforeDestroy() {
    this.unsubscribe && this.unsubscribe();
  }
}
</script>

<style lang="scss">
.realtime-text-input {
  position: absolute;
  z-index: $zindex-on;
  margin: -0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: $shadow;
  background-color: rgba($color-white, 0.5);

  p {
    margin-bottom: 0 !important;
  }
}
</style>
