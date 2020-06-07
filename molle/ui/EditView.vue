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
          :key="key"
          :is="contentStore.outlines[item.moduleId].name+'E'"
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
  import ValueTreeComp from "~/components/ValueTreeComp.vue";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {setMolleEditerModules} from "~/molle/editer/module/index";

  @Component({
    components: {ValueTreeComp}
  })
  export default class EditView extends Vue {
    contentStore = contentStore;
    setMolleEditerModules = setMolleEditerModules();

    ready = {
      values: false,
      styles: false,
    };

    unsubscribes: (() => void)[] = [];

    itemsRef?: firebase.firestore.CollectionReference;
    valuesRef?: firebase.firestore.CollectionReference;

    path: string = "loading";
    items: IItemStoreData[] = [];

    created() {
    }

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
              let data: IItemStoreData = <IItemStoreData>snap.data();
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
