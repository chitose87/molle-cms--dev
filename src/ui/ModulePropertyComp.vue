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
            @change="update('name')"
            placeholder="Name")

      //ID
      label.mr-2 id
        .u_auto-input
          span.u_auto-input__static.form-control.form-control-sm(v-html="itemData.tagId || 'id'")
          input.u_auto-input__input.form-control.form-control-sm(
            type="text"
            v-model="itemData.tagId"
            @change="update('tagId')"
            placeholder="id")

      //クラス
      label.mr-2 class
        .u_auto-input
          span.u_auto-input__static.form-control.form-control-sm(v-html="itemData.tagClass || 'class'")
          input.u_auto-input__input.form-control.form-control-sm(
            type="text"
            v-model="itemData.tagClass"
            @change="update('tagClass')"
            placeholder="class")

      //profile
      component(
        v-if="molleModules[itemData.moduleId].profile"
        :is="molleModules[itemData.moduleId].profile.options.name"
        :itemData="itemData"
        :onUpdate="update"
      )

      // style
      p style=
      textarea()
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
    itemId: string = "";
    itemData?: IItemData = <IItemData>{};
    lsStore = lsStore;
    private unsubscribe?: () => void;
    molleModules = molleModules;
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

          this.$set(this, "itemData", snap.data());
          this.$set(this, "itemId", snap.id);
          this.flag = true;
        });
      }
    }

    // focusModuleId: string = "none";
    //itemData: IItemStoreData | null = null;

    update(key: string, forceValue?: any) {
      console.log(key, forceValue)
      let update: any = {};
      if (forceValue || forceValue === false) {
        update[key] = forceValue;
      } else {
        //@ts-ignore
        update[key] = this.itemData[key];
      }
      Singleton.itemsRef.doc(this.itemId).update(update);
    }

    //moduleChange() {
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
  }
</style>
