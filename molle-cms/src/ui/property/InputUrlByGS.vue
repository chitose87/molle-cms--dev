<template lang="pug">
div
  label.w-100
    span {{label}}
    details.molle-guide
      summary
      .molle-guide__body.caption
        p 使用する画像が保存されているURLを入力します。

    input.form-control.form-control-sm(
      type="url"
      v-model="localValue"
      @change="(e)=>validation(e.target.value)"
      placeholder="https://---"
    )

  .pl-3(v-if="hostingSave.isStorage")
    label.form-inline
      span.mr-1.small └ HostingSave:
      input.form-control.form-control-sm(
        v-model="hostingSave.save",
        type="checkbox",
        @change="changeHostingSave"
      )

    label.w-100(v-if="hostingSave.save")
      span rename:
      input.form-control.form-control-sm(
        type="url"
        v-model="hostingSave.rename"
        @change="changeHostingSave"
        :placeholder="hostingSave.srcFileName.split('.')[0]"
      )
      span.small(v-if="hostingSave.rename") /storage/{{hostingSave.rename}}.{{hostingSave.extend}}

</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "nuxt-property-decorator";
import {OptionComp} from "./OptionComp";
import firebase from "firebase";
import {Singleton} from "~/molle-cms/src/Singleton";

@Component({
  components: {},
})
/**
 */
export default class InputUrlByGS extends OptionComp {
  hostingSave = {
    isStorage: false,
    rename: "",
    save: false,
    ref: <firebase.firestore.DocumentReference>{},
    srcFileName: "",
    extend: ""
  };

  mounted() {
    this.checkHostingSave();
  }

  validation(str: string) {
    if (/firebasestorage.googleapis.com/.test(str)) {
      str = str.match(".+/(.+?)([\?#;].*)?$")![1];
      str = `https://storage.googleapis.com/${process.env.storageBucket}/${decodeURIComponent(str)}`;
      this.$set(this, "localValue", str);
    }
    this.$emit("change");
    this.checkHostingSave();
  }

  //
  private checkHostingSave() {
    if (/storage.googleapis.com/.test(this.localValue)) {
      this.hostingSave.ref = Singleton.systemDocRef
        .collection("storage")
        .doc(encodeURIComponent(this.localValue));

      this.hostingSave.ref.get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          this.$set(this.hostingSave, "isStorage", true);
          if (!snap.exists) {
            this.$set(this.hostingSave, "save", false);
          } else {
            let obj: any = snap.data();
            this.$set(this.hostingSave, "save", obj.save);
            this.$set(this.hostingSave, "rename", obj.rename || "");
          }
          this.$set(this.hostingSave, "srcFileName", this.localValue.split("/").reverse()[0].split(".")[0]);
          this.$set(this.hostingSave, "extend", this.localValue.split(".").reverse()[0]);
        });
    } else {
      this.$set(this.hostingSave, "isStorage", false);
    }
  }

  changeHostingSave() {
    this.hostingSave.ref.set({
      save: this.hostingSave.save,
      src: this.localValue,
      rename: this.hostingSave.rename,
      srcName: this.hostingSave.srcFileName,
      extend: this.hostingSave.extend,
    });
  }
}
</script>

<style lang="scss">
</style>
