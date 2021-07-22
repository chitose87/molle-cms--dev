<template lang="pug">
.module-property-comp(v-if="$route.query.focus")
  .card.bg-light(v-if="flag")
    .card-header.pt-1.pb-1.pl-3.pr-3
      span {{itemData.moduleId}} プロパティ
      button.btn.btn-sm.btn-outline-secondary(
        v-if="$molleModules[itemData.moduleId].convert"
        :id="'moduleChange'"
      )
        b-icon(icon="arrow-repeat")
      b-popover(
        :target="'moduleChange'"
        title="change type" triggers="focus"
        placement="bottom"
        container="bootstrap-container"
        @show="()=>changeModuleSelected=$molleModules[itemData.moduleId].convert[0]"
      )
        form.form-group.form-check-inline(@submit.prevent @submit="moduleChange()")
          select.form-control.form-control-sm(v-model="changeModuleSelected")
            option(v-for="key in $molleModules[itemData.moduleId].convert" :value="key" v-html="key")
          button.btn.btn-sm.btn-info(type="submit") +
    .card-body.p-3
      component(
        v-if="$molleModules[itemData.moduleId].profile"
        :is="$molleModules[itemData.moduleId].profileName"
        :itemData="itemData"
        :itemId="itemId"
        @change="update"
      )
      hr

      //名前
      label.mr-2
        .u_auto-input
          span.u_auto-input__static.form-control.form-control-sm(v-html="itemData.name || 'name'")
          input.u_auto-input__input.form-control.form-control-sm(
            type="text"
            v-model="itemData.name"
            @change="update"
            placeholder="Name")

      //ID
      label.mr-2 id
        .u_auto-input
          span.u_auto-input__static.form-control.form-control-sm(v-html="itemData.tagId || 'id'")
          input.u_auto-input__input.form-control.form-control-sm(
            type="text"
            v-model="itemData.tagId"
            @change="update"
            placeholder="id")

      //クラス
      label.mr-2 class
        .u_auto-input
          span.u_auto-input__static.form-control.form-control-sm(v-html="itemData.tagClass || 'class'")
          input.u_auto-input__input.form-control.form-control-sm(
            type="text"
            v-model="itemData.tagClass"
            @change="update"
            placeholder="class")
      hr

      LogPropertyComp(:itemId="itemId")
      //
      label.small.form-inline
        input.form-control.form-control-sm(
          v-model="itemData.noExport",
          type="checkbox",
          @change="update"
        )
        span :書き出さない

      p.mb-0.text-right
        span.small.text-nowrap ID : {{$route.query.focus}}
        a.ml-2.text-nowrap(:href="firestoreUrl+itemId" target="firestore")
          span >firestore
          b-icon.ml-2(icon="window")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {IItemData, INodeObject, ILogsData} from "molle-cms/src/interface";
import {Singleton} from "molle-cms/src/Singleton";
import firebase from "firebase";
import LogPropertyComp from "molle-cms/src/ui/LogPropertyComp.vue";

@Component({
  components: {LogPropertyComp}
})
export default class ModulePropertyComp extends Vue {
  itemId: string = "";
  itemData = <IItemData>{};
  itemDataBefore = <IItemData>{};
  changeModuleSelected = "";
  private unsubscribe?: () => void;
  flag = false;
  pageFlag = true;
  maxHistory: number = 100;
  firestoreUrl = `https://console.firebase.google.com/project/${
    process.env.projectId
  }/firestore/data/${
    [process.env.molleProjectID, process.env.molleBrunch, "items", ""].join("~2F")
  }`;

  @Watch('$route.query.focus', {immediate: true})
  onChangeFocusModuleNode(newer: string, older?: string) {
      if (newer) {
        console.log("onChangeFocusModuleNode")
        this.flag = false;
        if (this.unsubscribe) {
          this.unsubscribe();
        }

        this.unsubscribe = Singleton.itemsRef.doc(newer).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) return;

          this.itemDataBefore = <IItemData>snap.data();
          let itemData = Object.assign({}, this.$molleModules[this.itemDataBefore.moduleId].def, snap.data());

          // if (!itemData.option) itemData.option = {};
          // if (!itemData.class) itemData.class = {};
          // if (!itemData.style) itemData.style = {};
          this.$set(this, "itemData", itemData);
          this.$set(this, "itemId", snap.id);
          this.flag = true;
        });
      }
  }

  /**
   *
   */
  update() {
    // console.log("update", this.itemData)

    function some(b: any, a: any): boolean {
      // console.log(b, a)
      let obj: any = Object.assign({}, b, a);
      return Object.keys(obj).some(key => {
        if (typeof obj[key] == "object") {
          return some(b[key] || {}, a[key] || {});
        } else {
          return b[key] != a[key];
        }
      });
    }

    let flag = false;
    let update: any = {};
    let before: any = this.itemDataBefore;
    let after: any = JSON.parse(JSON.stringify(this.itemData));
    let obj: any = Object.assign({}, before, after);
    Object.keys(obj).forEach((key) => {
      // console.log(key,before[key],after[key])
      if (typeof before[key] != typeof after[key]) {
        update[key] = after[key];
        flag = true;
      } else if (typeof obj[key] == "object") {
        if (some(before[key] || {}, after[key] || {})) {
          update[key] = after[key];
          flag = true;
        }
      } else if (before[key] != after[key]) {
        update[key] = after[key];
        flag = true;
      }
    });
    console.log(flag, "update", this.itemId, update)
    if (flag) {

      // firestoreのlogs登録 by青木
      let batch = firebase.firestore().batch();
      let updateTime = firebase.firestore.Timestamp.now();
      Singleton.logsRef.doc(this.itemId)
        .get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          let data = snap.data();
          if (data) {
            let history: ILogsData[] = data.history || [];
            history.unshift({
              timestamp: updateTime,
              uid: firebase.auth().currentUser!.uid,
              update: update
            });
            if (history.length > this.maxHistory) history.length = this.maxHistory;
            batch.update(Singleton.logsRef.doc(this.itemId), {history: history});
          }
          batch.update(Singleton.itemsRef.doc(this.itemId), update);
          batch.commit();
        })
    }
  }

  moduleChange() {
    console.log("moduleChangeスタート")
    if (this.changeModuleSelected) {
      let update: any = {moduleId: this.changeModuleSelected};
      // firestoreのlogs登録 by青木
      let batch = firebase.firestore().batch();
      let updateTime = firebase.firestore.Timestamp.now();
      Singleton.logsRef.doc(this.itemId)
        .get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          let data = snap.data();
          if (data) {
            let history: ILogsData[] = data.history || [];
            history.unshift({
              timestamp: updateTime,
              uid: firebase.auth().currentUser!.uid,
              update: update
            });
            if (history.length > this.maxHistory) history.length = this.maxHistory;
            batch.update(Singleton.logsRef.doc(this.itemId), {history: history});
          }
          update.updateTime = firebase.firestore.FieldValue.serverTimestamp();
          batch.update(Singleton.itemsRef.doc(this.itemId), update);
          batch.commit();
        })
      // convert
      // switch (this.itemData.moduleId) {
      //   case "Headline":
      //     switch (this.changeModuleSelected) {
      //       case "Paragraph":
      //         break;
      //     }
      //     break;
      //   case "Paragraph":
      //     break;
      // }
      update.updateTime = firebase.firestore.FieldValue.serverTimestamp();
      Singleton.itemsRef.doc(this.itemId).update(update);
    }
  }
}
</script>

<style lang="scss">
.module-property-comp {
}

.hoge {
  z-index: $zindex-modal;
}
</style>
