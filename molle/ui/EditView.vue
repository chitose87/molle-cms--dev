<template lang="pug">
  .editView
    div(v-if="!contentStore.pages[$route.query.id]")
      span not fond. {{$route.query.id}}
    div(v-else-if="!ready.values")
      p ...weiting
    div(v-else)
      .container
        //span(v-html="pageData.path")
        //div(v-for="(pageItem,key) in items")
          //span {{pageItem.index}}
          //span /
          //span {{pageItem.ref.id}}
        component(
          v-for="(item,key) in items"
          :is="contentStore.outlines[item.moduleId].name"
          :itemData="item"
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
  import {Component, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
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

    ready = {
      values: false,
      styles: false,
    };

    unsubscribes: (() => void)[] = [];

    itemsRef?: firebase.firestore.CollectionReference;
    valuesRef?: firebase.firestore.CollectionReference;
    // stylesRef?: firebase.firestore.CollectionReference;

    path: string = "loading";
    items: IPageItem[] = [];

    mounted() {
      console.log("mounted", this.$route.query.id);
      let data = contentStore.pages[<string>this.$route.query.id];
      if (!data) return;

      //init pageData
      this.path = data.path;
      this.items.length = 0;

      // items -> items
      this.itemsRef = firebase.firestore().collection(`pages/${this.$route.query.id}/items`);
      this.unsubscribes.push(
        this.itemsRef
          .orderBy("index")
          .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
            console.log(`--pages/${this.$route.query.id}/items`);
            this.items.length = 0;
            snapshot.forEach((snap: firebase.firestore.QueryDocumentSnapshot) => {
              console.log(snap.ref.path)
              let data: IPageItem = <IPageItem>snap.data();
              data.ref = snap.ref;
              this.items.push(data);
            });
          })
      );

      //values
      this.valuesRef = firebase.firestore().collection(`pages/${this.$route.query.id}/values`);
      this.unsubscribes.push(
        this.valuesRef
          .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
            contentStore.updateValues(snapshot);
            if (!this.ready.values) this.$nextTick(() => this.ready.values = true);
          })
      );
      //
      // //styles
      // this.stylesRef = firebase.firestore().collection(`pages/${this.$route.query.id}/styles`);
      // this.unsubscribes.push(
      //   this.stylesRef
      //     .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
      //       // contentStore.updateValues(snapshot);
      //       if (!this.ready.styles) this.$nextTick(() => this.ready.styles = true);
      //     })
      // );
    }

    /**
     * モジュールを追加
     */
    pushModule() {
      let index;
      try {
        index = this.items[this.items.length - 1].index! + 100;
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
        // this.stylesRef!.doc(e.id).set({});
      });
    }

    destroyed() {
      while (this.unsubscribes.length) {
        this.unsubscribes.shift()!();
      }
    }
  }
</script>

<style lang="scss">

</style>
