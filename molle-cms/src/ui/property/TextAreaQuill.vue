<template lang="pug">
.mt-2.mb-3
  label {{label}}
  button.btn.btn-link(@click="changeMode(!isSource)")
    span(v-if="!isSource") > {{$words.source}}
    span(v-else) > {{$words.editer}}

  .bg-white(v-show="!isSource")
    .quill-editor(ref="quillEditor")

  div(v-show="isSource")
    textarea.form-control.form-control-sm(
      v-model="localValue"
      @change="()=>$emit('change')"
    )

</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "nuxt-property-decorator";
import {OptionComp} from "./OptionComp";
import Quill from "quill";
import firebase from "firebase";

@Component({
  components: {},
})
/**
 */
export default class TextAreaQuill extends OptionComp {
  quill!: Quill;
  $editer!: HTMLElement;
  tagValue = "";
  isSource = false;

  mounted() {
    this.quill = new Quill(<Element>this.$refs.quillEditor!, {
      modules: {
        toolbar: [
          ["bold", "underline", "link", "clean"],
        ],
      },
      theme: "snow",
    });
    delete this.quill.getModule("keyboard").bindings["9"];//tab
    this.$editer = <HTMLElement>this.$el.querySelector(".ql-editor");

    // 入力
    this.quill.on("text-change", (e: any, old: any, source: string) => {
      if (source == "user") {
        this.update();
      }
    });

    this.changeMode(false);
  }

  changeMode(flag: boolean) {
    if (!flag) {
      this.tagValue = "<p>" + (this.localValue || "").replace(/<br>/g, "</p><p>") + "</p>";
      this.$editer.innerHTML = this.tagValue;
    }
    this.isSource = flag;
  }

  private update() {
    let rows: any[] = [];
    let loop = (children: any) => {
      if (children.length) {
        for (let i = 0; i < children.length; i++) {
          let child = children[i];
          let str = child.innerHTML || child.outerHTML || child;
          rows.push(str == "<br>" ? "" : str);
        }
      }
    };
    loop(this.$editer.children);

    //空の行を削除
    rows = rows.filter(v => v != "<br>" && v);
    let str = rows.join("<br>");
    //shift + enter killer
    str = str.replace(/(<br>)+/g, "<br>");

    this.$set(this, "localValue", str);
    this.$emit("change");
  }
}
</script>

<style lang="scss">
@import 'quill/dist/quill.snow.css';

</style>
