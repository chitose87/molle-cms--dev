<template lang="pug">
  .module-property-comp.bootstrap
    p(v-html="lsStore.storage.focusModuleId")
    div(v-if="flag")
      p
        span.mr-2(v-html="itemData.moduleId")
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

      //profile
      component(
        v-if="molleModules[itemData.moduleId].profile"
        :is="molleModules[itemData.moduleId].profileName"
        :itemData="itemData"
        @change="update"
      )
</template>

<script lang="ts">
  import {Component, Vue, Watch, Prop} from "~/node_modules/nuxt-property-decorator";
  import {lsStore} from "~/utils/store-accessor";
  import {IItemData} from "~/src/interface";
  import {Singleton} from "~/src/Singleton";
  import firebase from "~/node_modules/firebase";
  import {molleModules} from "~/plugins/Modules";

  @Component({
    components: {}
  })
  export default class ModulePropertyComp extends Vue {
    molleModules = molleModules;
    itemId: string = "";
    itemData = <IItemData>{};
    itemDataBefore = <IItemData>{};
    lsStore = lsStore;
    private unsubscribe?: () => void;
    flag = false;

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
          let itemData = <IItemData>snap.data();
          if (!itemData.option) itemData.option = {};
          if (!itemData.class) itemData.class = {};
          if (!itemData.style) itemData.style = {};
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

    min-width: 200px;
    max-width: 200px;
    height: 100vh;
    overflow: auto;

    position: sticky;
    top: 0;
    padding: 1rem;
  }
</style>
