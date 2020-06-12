<template lang="pug">
  form(@submit.prevent @submit="pushModule()")
    select(v-model="pushModuleSelected")
      option(v-for="(item,key) in contentStore.outlines" :value="key" v-html="item.name+'/'+key")
    button.btn.btn-primary(type="submit") Module追加

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import firebase from "firebase";

  @Component({
    components: {}
  })
  /**
   */
  export default class AddModuleComp extends Vue {
    contentStore = contentStore;

    pageRef?: firebase.firestore.DocumentReference;
    pushModuleSelected = "box";

    created() {
      this.pageRef = firebase.firestore().doc(`pages/${this.$route.query.id}`);
      // this.valuesRef =
    }

    pushModule() {
      // let index;
      // try {
      //   index = this.items![this.items!.length - 1].index! + 100;
      // } catch (e) {
      //   index = 100;
      // }
      this.pageRef!.collection("items")
        .add({
          moduleId: this.pushModuleSelected,
          // valueRef: null,
          // index: index,
          // joint: {
          //   text: "title"
          // }
        })
        .then((e: firebase.firestore.DocumentReference) => {
          this.pageRef!.collection("values").doc(e.id)
            .set({});
          this.$emit("added", e);
          // this.stylesRef!.doc(e.id).set({});
        });
    }
  }
</script>

<style lang="scss">
</style>
