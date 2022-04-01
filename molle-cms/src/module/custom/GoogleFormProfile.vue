<template lang="pug">
div
  label
    span.mr-1 {{custom.url.label}}:
    details.molle-guide
      summary
      .molle-guide__body.caption
        p GoogleFromのプレビューページのURLを入力します。
    input.form-control.form-control-sm(
      type="url"
      v-model="itemData.value.url"
      @change="()=>$emit('change')"
      placeholder="Google Form URL"
    )

  button.btn.btn-primary(
    type="button"
    @click="update"
    :disabled="status!=$words.update"
  )
    span {{status}}

  p.small {{itemData.updateTime && itemData.updateTime.toDate().toString()}}

  StyleComp(
    :itemData="itemData"
    @change="()=>$emit('change')"
  )

</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import StyleComp from "../../ui/property/StyleComp.vue";
import GoogleForm from "./GoogleForm.vue";
import {Profile} from "../Profile";

@Component({
  components: {StyleComp}
})
export default class GoogleFormProfile extends Profile {
  static readonly CLASS_NAME = "GoogleFormProfile";
  static readonly LANGS = {
    en:  GoogleForm.CLASS_NAME,
    jp: "GoogleForm",
  };
  // custom
  static readonly custom = {
    url: {label: Vue.prototype.$words.url, value: Vue.prototype.$words.url},
  };
  //style setting
  static readonly stylePermission = {
    // container: false,
    // border: false,
    // margin: "",
    // padding: "",
    // theme: {default: "", select: ["", "test"]},
    // color: {default: "", select: ["", "dark"]},
  };
  static settings = {
    type: "any",
    icon: "ui-radios",
  }

  status = Vue.prototype.$words.update

  update() {
    console.log("GoogleFormProfile:update")
    let update = {
      url: this.itemData.value.url,
      items: <any>[],
      action: "",
      id: ""
    };
    this.status = Vue.prototype.$words.request;
    // fetch(`http://localhost:5000/sw-id-lab/us-central1/getHtml?url=${encodeURIComponent(this.itemData.value.url)}`)
    fetch(`${process.env.functions}/getHtml?url=${encodeURIComponent(this.itemData.value.url)}`)
      .then((res: any) => {
        this.status = Vue.prototype.$words.response;
        return (res.json());
      })
      .then((html: string) => {
        // console.log(html)
        this.status = Vue.prototype.$words.analysis;
        let dom = document.createElement("div");
        dom.innerHTML = html;
        let $form = dom.querySelector(".freebirdFormviewerViewCenteredContent form");

        try {
          let str = html!
            .replace(/\r?\n/g, "")!
            .match(/FB_PUBLIC_LOAD_DATA_ =(.*?);/)![1];
          let data = JSON.parse(str);
          console.log(data);
          data[1][1].forEach((item: any[]) => {
            let option = JSON.parse(item[2]) || {};
            update.items.push({
              label: item[1],
              name: option.name || null,
              note: option.note || null,
              placeholder: option.placeholder || null,
              type: item[3],
              inputType: option.type || null,
              typeOption: JSON.stringify(item[4][0][1]),
              id: item[4][0][0],
              required: item[4][0][2]
            })
            console.log(item);
          })
          update.action = data[14];
          update.id = $form!.id;
          console.log(update)
          this.$set(this.itemData, "value", update);
          this.$emit("change");
          this.status = Vue.prototype.$words.update;
        } catch (e) {
          this.status = Vue.prototype.$words.error;
          setTimeout(() => {
            this.status = Vue.prototype.$words.update;
          }, 1000);
          console.log(e)
        }
      })
  }
}
</script>

<style lang="scss">
</style>
