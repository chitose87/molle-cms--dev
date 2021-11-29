<template lang="pug">
.site-settings-comp
  h2.p-3.mt-0.mb-4.text-white.bg-success(@click="flag=!flag")
    b-icon.mr-2(icon="tools")
    | {{$words.site}} {{$words.settings}}
    b-icon(:icon="flag?'chevron-up':'chevron-down'")

  div(v-if="flag")
    h3 単語帳
    table.item-list-view-comp
      thead
        tr
          th(scope="col") ID ${ID}で使用
          th(scope="col") Value
          th(scope="col")
      tbody
        tr
          th(scope="row")
            input.form-control(type="text" v-model="addObj.id")
          td
            input.form-control(type="text" v-model="addObj.value")
          td
            button.btn.btn-primary(type="button" @click="add")
              span Add
        tr(v-for="(item,i) in datalist")
          th(scope="row")
            input.form-control(type="text" v-model="item.id" @change="update")
          td
            input.form-control(type="text" v-model="item.value" @change="update")
          td
            button.btn.btn-primary(type="button" @click="onDelete(i)")
              span Delete
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {Singleton} from "../Singleton";
import firebase from "firebase";
import {MoUtils} from "../MoUtils";

@Component({
  components: {},
})
export default class SiteSettingsComp extends Vue {
  flag = false;
  inited = false;

  addObj = {id: "", value: ""};
  datalist = <{ id: string, value: string }[]>[];

  @Watch("flag")
  onOpen() {
    if (!this.inited) {
      this.inited = true;

      Singleton.systemDocRef
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          let siteData: any = snap.data();
          this.$set(this, "datalist", siteData.datalist || []);
        });
    }
  }

  add() {
    Singleton.systemDocRef.update("datalist",
      [Object.assign({}, this.addObj), ...this.datalist]);
    this.addObj.id="";
    this.addObj.value="";
  }

  onDelete(i: number) {
    console.log(i);
    let arr = this.datalist.concat();
    arr.splice(i, 1);
    Singleton.systemDocRef.update("datalist", arr);
  }

  update() {
    Singleton.systemDocRef.update("datalist",this.datalist);
  }
}
</script>

<style lang="scss">
.site-settings-comp {

}
</style>
