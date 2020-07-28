<template lang="pug">
  no-ssr
    .molle
      div(v-if="!Object.keys(store.pages).length")
        p ...weiting
      div(v-else-if="$route.hash==='#page-edit'")
        div(v-if="!store.pages[$route.query.id]")
          span not fond. {{$route.query.id}}
        EditView(v-else :pageData="store.pages[$route.query.id]")
      div(v-else)
        PageList

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import * as firebase from "~/node_modules/firebase";
  import PageList from "~/molle/ui/PageList.vue";
  import EditView from "~/molle/ui/EditView.vue";
  import {Singleton} from "~/molle/Singleton";

  @Component({
    components: {EditView, PageList}
  })
  export default class MolleTopPage extends Vue {
    store = Singleton.store;

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
          firebase.firestore().collection("pages")
            .onSnapshot(Singleton.updatePages);

          firebase.firestore().collection("outlines")
            .onSnapshot(Singleton.updateOutlines);
        });
      }
    }
  }
</script>

<style lang="scss">
  .bootstrap {
    //$input-color: $body-color;
    //$input-placeholder-color: $gray-400;

    //$grid-columns: 12;
    //$grid-gutter-width: 1.5rem;
    //$grid-row-columns: 6;
    //
    //$spacers: ();
    //$spacers: map-merge(
    //    (
    //      0: 0,
    //      1: ($spacer * .25),
    //      2: ($spacer * .5),
    //      3: $spacer,
    //      4: ($spacer * 1.5),
    //      5: ($spacer * 3),
    //      6: ($spacer * 4),
    //      7: ($spacer * 5),
    //      8: ($spacer * 6),
    //      9: ($spacer * 7),
    //      10: ($spacer * 8),
    //    ),
    //    $spacers
    //);

    @import '~bootstrap/scss/bootstrap';
    @import '~bootstrap-vue/src/index.scss';

    @each $color, $value in $colors {
      @include bg-variant(".bg-#{$color}", $value, true);
    }
  }
</style>
