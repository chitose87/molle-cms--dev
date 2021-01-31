<template lang="pug">
  div
    //SpaceOptionComp(
    //  :label="'横の隙間'",
    //  :data="itemData.option || {}"
    //  :dataKey="'gutter-h'"
    //  :negative="false"
    //  @change="(v)=>onUpdate('option',v)"
    //)
    //SpaceOptionComp(
    //  :label="'縦の隙間'",
    //  :data="itemData.option || {}"
    //  :dataKey="'gutter-v'"
    //  :negative="false"
    //  @change="(v)=>onUpdate('option',v)"
    //)
    label.form-inline
      span.mr-1 URL:
      input.form-control.form-control-sm(
        v-model="itemData.value.url"
        @change="()=>$emit('change')"
      )

    button.btn.btn-primary(type="button" @click="update")
      span 更新
    StyleComp(
      :itemData="itemData"
      @change="()=>$emit('change')"
      :permission="stylePermission"
    )
    //ChildrenOptionComp(
    //  :moduleId="itemData.moduleId"
    //  v-model="itemData.value"
    //  @change="()=>$emit('change')"
    //)

</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import {Profile} from "~/molle/module/Profile";
  import StyleComp from "~/molle/ui/property/StyleComp.vue";
  import ChildrenOptionComp from "~/molle/ui/property/ChildrenOptionComp.vue";

  @Component({
    components: {ChildrenOptionComp, StyleComp}
  })
  export default class GoogleFormProfile extends Profile {
    //style setting
    stylePermission = {
      // container: false,
      // border: false,
      // margin: "",
      // padding: "",
      // theme: {default: "", select: ["", "test"]},
      // color: {default: "", select: ["", "dark"]},
    };

    update() {
      let update = {
        url: this.itemData.value.url,
        items: <any>[],
        action: ""
      };
      fetch(`https://us-central1-sw-id-lab.cloudfunctions.net/getHtml?url=${encodeURIComponent(this.itemData.value.url)}`)
        .then((res: any) => {
          return (res.json());
        }).then((html: string) => {
        let dom = document.createElement("div");
        dom.innerHTML = html;
        let $form = dom.querySelector(".freebirdFormviewerViewCenteredContent form");

        try {
          let str = html!
            .replace(/\r?\n/g, "")!
            .match(/FB_PUBLIC_LOAD_DATA_ =(.*?);/)![1];
          let data = JSON.parse(str);
          data[1][1].forEach((item: any[]) => {
            let option = JSON.parse(item[2]) || {};
            update.items.push({
              label: item[1],
              name: option.name || null,
              note: option.note || null,
              placeholder: option.placeholder || null,
              type: item[3],
              typeOption: JSON.stringify(item[4][0][1]),
              id: item[4][0][0],
              required: item[4][0][2]
            })
            console.log(item);
          })
          update.action = data[14];
          console.log(update)
          this.$set(this.itemData, "value", update);
          this.$emit("change");

        } catch (e) {
          console.log(e)
        }
      })
    }
  }
</script>

<style lang="scss">
</style>
