<template lang="pug">
  no-ssr
    .molle
      div(v-if="!Object.keys(contentStore.pages).length")
        p ...weiting
      div(v-else-if="$route.hash==='#page-edit'")
        EditView
      div(v-else)
        PageList

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import * as firebase from "~/node_modules/firebase";
  import PageList from "~/molle/ui/PageList.vue";
  import EditView from "~/molle/ui/EditView.vue";

  @Component({
    components: {EditView, PageList}
  })
  export default class MolleTopPage extends Vue {
    contentStore = contentStore;

    head() {
      return {
        link: [
          // {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css'},
        ],
        script: [
          // {src: "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"}
        ]
      }
    }

    mounted() {
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: process.env.apiKey,
          authDomain: process.env.authDomain,
          databaseURL: process.env.databaseURL,
          projectId: process.env.projectId,
          storageBucket: process.env.storageBucket,
          messagingSenderId: process.env.messagingSenderId,
        });

        //routes index
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user);
          firebase.firestore().collection("pages")
            .onSnapshot(contentStore.updatePages);

          firebase.firestore().collection("outlines")
            .onSnapshot(contentStore.updateOutlines);

          // firebase.firestore().collection("values")
          //   .onSnapshot(contentStore.updateValues);

          // node test
          let pages = firebase.firestore().collection("pages").get();
          let outlines = firebase.firestore().collection("outlines").get();
          let items = firebase.firestore().collectionGroup("items").get();
          let values = firebase.firestore().collectionGroup("values").get();
          let styles = firebase.firestore().collectionGroup("styles").get();
          Promise.all([pages, outlines, items, values, styles])
            .then(([pages, outlines, items, values, styles]) => {

              let allData: any = {
                pages: {}, outlines: {}, items: {}, values: {}, styles: {}
              };

              pages.forEach((snap) => {
                allData.pages[snap.id] = snap.data()
              });
              outlines.forEach((snap) => {
                allData.outlines[snap.id] = snap.data()
              });
              items.forEach((snap) => {
                allData.items[snap.id] = snap.data()
              });
              values.forEach((snap) => {
                allData.values[snap.id] = snap.data()
              });
              styles.forEach((snap) => {
                allData.styles[snap.id] = snap.data()
              });

              console.log(allData);
            })
        });


      }
    }
  }
</script>

<style lang="scss">

</style>
