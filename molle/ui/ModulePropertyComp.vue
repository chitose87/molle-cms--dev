<template lang="pug">
.module-property-comp(v-if="lsStore.storage.focusModuleNode.id")
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
      span.small.text-nowrap ID : {{lsStore.storage.focusModuleNode.id}}

      //button.btn.module-editor__notExport(
      //  v-if="!$parent.required"
      //  @click="update('notExport',!itemData.notExport)"
      //)
      //  b-icon(icon="eye-slash-fill" v-if="itemData.notExport")
      //  b-icon(icon="eye-fill" v-else)
      //profile
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

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
import {lsStore} from "~/utils/store-accessor";
import {IItemData, INodeObject} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "~/node_modules/firebase";

@Component({
  components: {}
})
export default class ModulePropertyComp extends Vue {
  itemId: string = "";
  itemData = <IItemData>{};
  itemDataBefore = <IItemData>{};
  changeModuleSelected = "";
  lsStore = lsStore;
  private unsubscribe?: () => void;
  flag = false;
  pageFlag = true;

  @Watch('lsStore.storage.focusModuleNode', {immediate: true})
  onChangeFocusModuleNode(newer: INodeObject, older?: INodeObject) {
    if (newer && newer.id) {
      console.log("onChangeFocusModuleNode")
      this.flag = false;
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.unsubscribe = Singleton.itemsRef.doc(newer.id).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
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
    console.log("update", this.itemData)

    function some(b: any, a: any): boolean {
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
    let after: any = this.itemData;
    let obj: any = Object.assign({}, before, after);
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] == "object") {
        console.log(key, before[key], after[key])
        if (some(before[key] || {}, after[key] || {})) {
          update[key] = after[key];
          flag = true;
        }
      } else if (before[key] != after[key]) {
        update[key] = after[key];
        flag = true;
      }
    });
    console.log("update", this.itemId, update)
    if (flag) {
      update.updateTime = firebase.firestore.FieldValue.serverTimestamp();
      Singleton.itemsRef.doc(this.itemId).update(update);
    }
  }

  moduleChange() {
    if (this.changeModuleSelected) {
      let update: any = {moduleId: this.changeModuleSelected};

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
