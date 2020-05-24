<template lang="pug">
  no-ssr
    .molle
      button.btn.btn-primary(@click="addPage") 新規
      ul.list-group.list-group-flush
        li.list-group-item(v-for="(item,key) in pageStore.list")
          form(@submit.prevent="changePath(key)")
            input(:value="item.path" @blur="changePath(key)" :ref="key")


</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {pageStore} from "~/utils/store-accessor";
  import * as firebase from "~/node_modules/firebase";

  @Component({
    components: {}
  })
  export default class MolleTopPage extends Vue {
    pageStore = pageStore;

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
          firebase.firestore().collection("routes").onSnapshot(pageStore.updateList);
        });
      }
    }

    addPage() {
      firebase.firestore().collection("routes")
        .add({
          name: "Tokyo",
          path: "Japan"
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    /**
     *
     * @param key
     */
    changePath(key: string) {
      console.log(key, this.$refs[key]);
    }
  }
</script>

<style lang="scss">

</style>
