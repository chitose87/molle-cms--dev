<template lang="pug">
  .pageList
    button.btn.btn-primary(@click="addPage") 新規
    ul.list-group.list-group-flush
      li.list-group-item(v-for="(item,key) in contentStore.pages")
        form(@submit.prevent="changePath(key)")
          input(:value="item.path" @blur="changePath(key)" :ref="key")
          nuxt-link(:to="{hash:'page-edit',query:{id:key}}") 編集

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class PageList extends Vue {
    contentStore = contentStore;

    addPage() {
      firebase.firestore().collection("pages")
        .add({
          // pageRef: "pageRef",
          path: "hoge/hoge"
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
