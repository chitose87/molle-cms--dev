<template lang="pug">
  no-ssr
    .molle-sys-ui
      .container
        h1 Molle Contents Management System v0.0.2

        h2 Universal pages list
        ul
          li(v-for="(item,key) in pages")
            NuxtLink(:to="`--molle/${item.path}`")
              span(v-html="item.path")
              span(v-html="item.itemId")
            button(type="button" @click="deletePage(key)") Delete

        p
          label Path
            input(type="text" v-model="added.path")
          label Box id *
            input(type="text" v-model="added.itemId")
          button(type="button" :disabled="added.path===''" @click="addPage") Add

</template>

<script lang="ts">

  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import firebase from "~/node_modules/firebase";
  import {Singleton} from "~/src/Singleton";
  import {IPageData} from "~/src/interface";

  @Component({})
  export default class MolleTopPage extends Vue {

    added: IPageData = {
      path: "",
      itemId: ""
    };

    pages: { [key: string]: IPageData } = {};

    created() {
      Singleton.firebaseInit(() => {
        Singleton.pagesRef.onSnapshot((snap: firebase.firestore.QuerySnapshot) => {
          this.$set(this, "pages", {});

          snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
            this.$set(this.pages, _snap.id, _snap.data());
          });
        });
      });
    }

    addPage() {
      let pageId = this.added.path.replace(/\//g, "__");
      Singleton.pagesRef.doc(pageId).set({
        path: this.added.path,
        itemId: this.added.itemId || pageId
      });
    }

    deletePage(id: string) {
      Singleton.pagesRef.doc(id).delete();
    }
  }
</script>

<style lang="scss">
  .molle-sys-ui {

  }
</style>
