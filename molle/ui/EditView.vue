<template lang="pug">
  .editView
    span(v-html="getId()")
    .container(v-if="pageData")
      span(v-html="pageData.path")
      div(v-for="(item,key) in pageData.items")
        span {{item.index}}
        span {{item.id}}
        component(
          :is="contentStore.outlines[item.moduleId].name"
          :itemData="item"
        )

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

  @Component({
    components: {}
  })
  export default class EditView extends Vue {
    contentStore = contentStore;

    id: string = "";
    itemsRef?: firebase.firestore.CollectionReference;
    unsubscribe?: () => void;

    pageData: any = {
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
        if (this.unsubscribe) {
          this.unsubscribe();
        }

        let data = contentStore.pages[this.id];
        //init pageData
        this.pageData.path = data.path;
        this.pageData.items.length = 0;

        this.itemsRef = firebase.firestore().collection(`pages/${this.id}/items`);
        this.unsubscribe = this.itemsRef.onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          this.pageData.items.length = 0;
          snapshot.forEach((snap: firebase.firestore.QueryDocumentSnapshot) => {
            let data = snap.data();
            data.id = snap.id;

            //sort
            for (let i = 0; i < this.pageData.items.length; i++) {
              let via = this.pageData.items[i];
              if (data.index < via.index) {
                this.pageData.items.splice(i, 0, data);
                return
              }
            }
            this.pageData.items.push(data);
          });
        });
      }
      return this.$route.query.id;
    }

    /**
     * モジュールを追加
     */
    pushModule() {
      let index;
      try {
        index = this.pageData.items[this.pageData.items.length - 1].index + 100;
      } catch (e) {
        index = 100;
      }
      this.itemsRef!.add({
        moduleId: "0",
        valueRef: null,
        index: index,
        joint: {
          text: "title"
        }
      })
    }

    destroyed() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }
</script>

<style lang="scss">

</style>
