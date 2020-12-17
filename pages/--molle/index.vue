<template lang="pug">
  //no-ssr
  .molle-sys-ui
    .container
      h1 Molle Contents Management System v0.0.2

</template>

<script lang="ts">

  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import firebase from "~/node_modules/firebase";

  @Component({})
  export default class MolleTopPage extends Vue {
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
      }
    }
  }
</script>

<style lang="scss">

</style>
