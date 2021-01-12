<template lang="pug">
  .module-property-comp.bootstrap.shadow(:aria-expanded="expanded")
    .card.bg-light
      button.btn.btn-outline-secondary.module-property-comp__toggle(
        @click="()=>expanded=!expanded"
      )
        b-icon(icon="layout-sidebar-inset-reverse")

      .card-header.pt-1.pb-1.pl-3.pr-3 プロパティ
      .card-body.p-3(v-if="flag")
        p
          span Type :
          span(v-html="itemData.moduleId")
          br
          span.small.text-nowrap ID : {{lsStore.storage.focusModuleId}}
          //button.btn.btn-sm.btn-outline-secondary(
          //  @click="moduleChange()"
          //)
          //  b-icon(icon="pencil")

        //button.btn.module-editor__notExport(
        //  v-if="!$parent.required"
        //  @click="update('notExport',!itemData.notExport)"
        //)
        //  b-icon(icon="eye-slash-fill" v-if="itemData.notExport")
        //  b-icon(icon="eye-fill" v-else)
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
        //profile
        component(
          v-if="molleModules[itemData.moduleId].profile"
          :is="molleModules[itemData.moduleId].profileName"
          :itemData="itemData"
          @change="update"
        )
        hr

</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
  import {lsStore} from "~/utils/store-accessor";
  import {IItemData} from "~/molle/interface";
  import {Singleton} from "~/molle/Singleton";
  import firebase from "~/node_modules/firebase";
  import {molleModules} from "~/plugins/Modules";
  import Button from "~/molle/module/primitive/Button.vue";

  @Component({
    components: {Button}
  })
  export default class ModulePropertyComp extends Vue {
    molleModules = molleModules;
    itemId: string = "";
    itemData = <IItemData>{};
    itemDataBefore = <IItemData>{};
    lsStore = lsStore;
    private unsubscribe?: () => void;
    flag = false;
    expanded = true;

    @Watch('lsStore.storage.focusModuleId', {immediate: true})
    onChangeFocusModuleId(newer: string, older?: string) {
      if (newer) {
        this.flag = false;
        if (this.unsubscribe) {
          this.unsubscribe();
        }

        this.unsubscribe = Singleton.itemsRef.doc(newer).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) return;

          this.itemDataBefore = <IItemData>snap.data();
          let itemData = <IItemData>Object.assign({}, molleModules[this.itemDataBefore.moduleId].def, snap.data());

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
          if (some(before[key] || {}, after[key] || {})) {
            update[key] = after[key];
            flag = true;
          }
        } else if (before[key] != after[key]) {
          update[key] = after[key];
          flag = true;
        }
      });
      console.log("update", update)
      if (flag) {
        Singleton.itemsRef.doc(this.itemId).update(update);
      }
    }
  }
</script>

<style lang="scss">
  .module-property-comp {
    background-color: $color-gray-100;

    height: 100vh;
    overflow: auto;

    position: sticky;
    top: 0;

    width: 0;
    &[aria-expanded=true] {
      min-width: 200px;
      max-width: 200px;
    }

    &__toggle {
      position: fixed;
      top: 0rem;
      right: 0rem;
    }
  }
</style>
