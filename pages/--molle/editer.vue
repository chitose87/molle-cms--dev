<template lang="pug">
  div
    no-ssr
      .l-molle(v-if="pageData.itemId")
        .l-molle__left
          ItemListViewComp(:itemId="pageData.itemId")
        .l-molle__main(ref="main")
          h1 lv1 no-ssr
          p(v-html="pageData.itemId")
          p(v-html="pageData.path")

          .container
            ModuleLoader(:itemId="pageData.itemId")
        .l-molle__right
          ModulePropertyComp

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IPageData} from "~/molle/interface";
  import {Singleton} from "~/molle/Singleton";
  import firebase from "firebase";
  import ItemListViewComp from "~/molle/ui/ItemListViewComp.vue";
  import ModulePropertyComp from "~/molle/ui/ModulePropertyComp.vue";
  import { Module } from "~/molle/module/Module";
import { lsStore } from "~/utils/store-accessor";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";

  @Component({
    components: {ModulePropertyComp, ItemListViewComp}
  })
  export default class MolleEditerPage extends Vue {
    pageData: IPageData = <IPageData>{};

    created() {
      let str = decodeURIComponent(<string>this.$route.query.pageId);

      Singleton.firebaseInit(() => {
        firebase.firestore().doc(`version/${Singleton.systemVersion}/pages/${this.$route.query.pageId}`).get()
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) {
              console.log("no page data");
              return;
            }
            let pageData = <IPageData>snap.data();
            this.$set(this, "pageData", pageData);
          });
      });
    }

    mounted(){
      this.$el.addEventListener("click", (e: any) => {
        for (let i = 0; i < e.path.length; i++) {
          let v = e.path[i].__vue__;
          if (v && v instanceof ModuleLoader) {
            let module: ModuleLoader = v;
            lsStore.update({key: "focusModuleId", value: module.$props.itemId});
            break;
          }
        }
      })
    }
  }
</script>

<style lang="scss">
  .l-molle {
    display: flex;

    &__left {

    }

    &__main {
      flex: 1;
    }

    &__right {

    }

    //.u_auto-input
    .u_auto-input {
      position: relative;
      display: inline-block;

      &__static {
        visibility: hidden;
        text-indent: 0.5em;
      }

      &__input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
      }
    }
  }
</style>
