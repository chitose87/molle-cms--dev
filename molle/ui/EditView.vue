<template lang="pug">
  .editView
    div(v-if="!contentStore.pages[$route.query.id]")
      span not fond. {{$route.query.id}}
    div(v-else-if="!ready.values || !ready.items")
      p ...weiting
    div(v-else)
      .container
        BoxE(:itemData="getItem()")
        //span(v-html="pageData.path")
        //div(v-for="(pageItem,key) in items")
          //span {{pageItem.index}}
          //span /
          //span {{pageItem.ref.id}}
        //component(
        //  v-for="(item,key) in items"
        //  :key="key"
        //  :is="contentStore.outlines[item.moduleId].name+'E'"
        //  :itemData="item"
        //)

      //ValueTreeComp(:items="items")


      //div
        select.form-control(v-model="itemOption.name")
          option(v-for="(item,key) in contentStore.items" :value="item.name") {{item.name}}
        component(
          v-if="itemOption.name"
          //:is="itemOption.name"
            )
    //AddModuleComp

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import ValueTreeComp from "~/components/ValueTreeComp.vue";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {setMolleEditerModules} from "~/molle/editer/module";
  import AddModuleComp from "~/components/AddModuleComp.vue";

  @Component({
    components: {AddModuleComp, ValueTreeComp}
  })
  export default class EditView extends Vue {
    contentStore = contentStore;
    setMolleEditerModules = setMolleEditerModules();

    @Prop() pageData?: {
      id: string,

      path: string,
      main: string
    };

    ready = {
      items: false,
      values: false,
      styles: false,
    };

    unsubscribes: (() => void)[] = [];

    pageRef?: firebase.firestore.DocumentReference;
    itemsRef?: firebase.firestore.CollectionReference;
    valuesRef?: firebase.firestore.CollectionReference;

    path: string = "loading";

    created() {
      this.pageRef = firebase.firestore().doc(`pages/${this.pageData!.id}`);
      this.itemsRef = this.pageRef.collection(`items`);
      this.valuesRef = this.pageRef.collection(`values`);

      this.changePageData();
    }

    @Watch("pageData")
    changePageData() {
      console.log("--changePageData", this.pageData);

      if (!this.pageData!.main) {
        // ルートコンテツエリアが未設定
        this.setFirstItem();
      } else {
        this.unsubscribes.push(
          this.itemsRef!
            .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
              contentStore.updateItems(snapshot);

              // ルートコンテツエリアが存在しなかった
              if (!contentStore.items[this.pageData!.main]) {
                this.itemsRef!.doc(this.pageData!.main).set({
                  moduleId: "box",
                });
              } else {
                if (!this.ready.items) this.$nextTick(() => this.ready.items = true);
              }
            })
        );

        //values
        this.unsubscribes.push(
          this.valuesRef!
            .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
              contentStore.updateValues(snapshot);
              if (!this.ready.values) this.$nextTick(() => this.ready.values = true);
            })
        );
      }
    }

    private setFirstItem() {
      this.itemsRef!.add({
        moduleId: "box",
      }).then((e) => {
        this.pageRef!.update({
          main: e.id
        });
      });
    }

    getItem() {
      let v = Object.assign({}, contentStore.items[this.pageData!.main]);
      v.ref = firebase.firestore().doc(v.path);
      return v;
    }

    mounted() {
      console.log("mounted", this.$route.query.id);
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
