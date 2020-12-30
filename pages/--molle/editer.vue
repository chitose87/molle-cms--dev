<template lang="pug">
  no-ssr
    div
      .l-molle(v-if="pageData.itemId")
        .l-molle__left
          ItemListViewComp(:itemId="pageData.itemId")
        .l-molle__main
          h1 lv1 no-ssr
          p(v-html="pageData.itemId")
          p(v-html="pageData.path")

          .container
            ModuleLoader(:itemId="pageData.itemId")
        .l-molle__right
          p ppppppppp

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IPageData} from "~/src/interface";
  import ItemListViewComp from "~/src/ui/ItemListViewComp.vue";
  import {Singleton} from "~/src/Singleton";
  import firebase from "firebase";

  @Component({
    components: {ItemListViewComp}
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
  }
</style>
