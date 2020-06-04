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
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
