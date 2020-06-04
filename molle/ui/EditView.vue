<template lang="pug">
  .editView
    span(v-html="getId()")
    .container(v-if="pageData")
      span(v-html="pageData.path")
      div(v-for="(pageItem,key) in pageData.items")
        span {{pageItem.index}}
        span /
        span {{pageItem.ref.id}}
        component(
          :is="contentStore.outlines[pageItem.moduleId].name"
          :itemData="pageItem"
        )

    ValueTreeComp

      //div
        select.form-control(v-model="itemOption.name")
          option(v-for="(item,key) in contentStore.items" :value="item.name") {{item.name}}
        component(
          v-if="itemOption.name"
          //:is="itemOption.name"
            )

    button.btn.btn-primary(@click="pushModule()") Module追加

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {IPage, IPageItem} from "~/molle/interface/Page";
  import {IValue} from "~/molle/interface/Value";
  import ValueTreeComp from "~/components/ValueTreeComp.vue";

  @Component({
    components: {ValueTreeComp}
  })
  export default class EditView extends Vue {
    contentStore = contentStore;

    id: string = "";
    itemsRef?: firebase.firestore.CollectionReference;
    valuesRef?: firebase.firestore.CollectionReference;
    unsubscribe?: () => void;
    unsubscribeValues?: () => void;

    pageData: IPage = {
      path: "loading",
      items: [],
    };

    mounted() {

    }

    getId() {
      //idが変わり、contentStore.pagesの用意ができたら
      if (this.id != this.$route.query.id
        && contentStore.pages[<string>this.$route.query.id]) {

        this.id = <string>this.$route.query.id;
        //現在のwatchを停止
        if (this.unsubscribe) this.unsubscribe();
        if (this.unsubscribeValues) this.unsubscribeValues();

        let data = contentStore.pages[this.id];
        //init pageData
        this.pageData.path = data.path;
        this.pageData.items.length = 0;

        this.itemsRef = firebase.firestore().collection(`pages/${this.id}/items`);
        this.unsubscribe = this.itemsRef
          .orderBy("index")
          .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
            console.log(`--pages/${this.id}/items`);
            this.pageData.items.length = 0;
            snapshot.forEach((snap: firebase.firestore.QueryDocumentSnapshot) => {
              console.log(snap.ref.path)
              let data: IPageItem = <IPageItem>snap.data();
              data.ref = snap.ref;
              this.pageData.items.push(data);
            });
          });

        //values
        this.valuesRef = firebase.firestore().collection(`pages/${this.id}/values`);
        this.unsubscribeValues = this.valuesRef
          .onSnapshot(contentStore.updateValues);
      }
      return this.$route.query.id;
    }

    /**
     * モジュールを追加
     */
    pushModule() {
      let index;
      try {
        index = this.pageData.items[this.pageData.items.length - 1].index! + 100;
      } catch (e) {
        index = 100;
      }
      this.itemsRef!.add({
        moduleId: "0",
        // valueRef: null,
        index: index,
        // joint: {
        //   text: "title"
        // }
      }).then((e) => {
        this.valuesRef!.doc(e.id).set({});
      });
    }

    destroyed() {
      if (this.unsubscribe) this.unsubscribe();
      if (this.unsubscribeValues) this.unsubscribeValues();
    }
  }
</script>

<style lang="scss">

</style>
