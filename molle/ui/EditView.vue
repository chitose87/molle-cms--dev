<template lang="pug">
  .editView
    .container
      p editView
      | {{Object.keys(store.items)}}
      | {{pageData.main.id}}
      div(v-if="children.main && children.main.ref")
        span {{children.main.ref.id}}
        BoxE(
          :itemData="children.main"
        )
    //ValueTreeComp()

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  // import ValueTreeComp from "~/molle/ui/ValueTreeComp.vue";
  import {setMolleEditerModules} from "~/molle/editer/module";
  import {IItemStoreData, ItemProfile} from "~/molle/interface/ItemProfile";
  import {ItemStoreDataMgr} from "~/molle/editer/ItemStoreDataMgr";
  import {IPageStoreData} from "~/molle/interface/IPageStoreData";
  import {Singleton} from "~/molle/Singleton";

  @Component({
    components: {}
  })
  export default class EditView extends Vue {
    // contentStore = contentStore;
    store = Singleton.store;
    setMolleEditerModules = setMolleEditerModules();

    @Prop() pageData?: IPageStoreData;

    ready: any = {};


    // ready = {
    //   items: false,
    // values: false,
    // styles: false,
    // };

    // unsubscribes: (() => void)[] = [];
    // pageRef = firebase.firestore().doc(`pages/${this.pageData!.id}`);

    // children = {
    //   main: <{ ref: firebase.firestore.DocumentReference, data: IItemStoreData }>{},
    // };
    children = <{
      main: IItemStoreData,
    }>{};

    // itemRef?: firebase.firestore.DocumentReference;
    // valuesRef?: firebase.firestore.CollectionReference;

    path: string = "loading";

    // constructor(props: any) {
    //   super(props);
    //   this.pageRef = firebase.firestore().doc(`pages/${this.pageData!.id}`);
    // }

    created() {
      // this.itemsRef = this.pageRef.collection(`items`);
      // this.valuesRef = this.pageRef.collection(`values`);

      this.changePageData();
    }

    @Watch("pageData")
    changePageData() {
      console.log("--changePageData", this.pageData);

      if (!this.pageData!.main) {
        // ルートコンテツエリアが未設定
        firebase.firestore().collection(`items`).add({
          moduleId: "box",
          type: "children",
        }).then((e) => {
          this.pageData!.ref.update({
            main: e
          });
        });
      } else {
        // this.children.main = new ItemProfile(this.pageData!.main);

        ItemStoreDataMgr.get(
          this.pageData!.main,
          (itemData: IItemStoreData) => {
            this.$set(this.children, "main", itemData);
          },
          {
            moduleId: "box",
            type: "children",
          }
        );
        //
        // this.children.main.ref = firebase.firestore().doc(`items/${this.pageData!.main}`);
        //
        // this.unsubscribes.push(
        //   this.children.main.ref
        //     .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        //       console.log("onSnapshot", snap.ref.path)
        //       if (!snap.exists) {
        //         this.children.main.ref.set({
        //           moduleId: "box",
        //           type: "children",
        //         });
        //         return;
        //       }
        //
        //       let v = <IItemStoreData>snap.data();
        //       v.path = snap.ref.path;
        //       v.id = snap.id;
        //       contentStore.addItem(v);
        //       this.$set(this.children.main, "data", v);
        //
        //       this.$nextTick(() => this.ready.items = true);
        //       // contentStore.updateItems(snapshot);
        //       //
        //       // ルートコンテツエリアが存在しなかった
        //       // if (!contentStore.items[this.pageData!.main]) {
        //       //   this.itemRef!.doc(this.pageData!.main).set({
        //       //     moduleId: "box",
        //       //   });
        //       // } else {
        //       //   if (!this.ready.items) this.$nextTick(() => this.ready.items = true);
        //       // }
        //     })
        // );

        //values
        // this.unsubscribes.push(
        //   this.valuesRef!
        //     .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
        //       contentStore.updateValues(snapshot);
        //       if (!this.ready.values) this.$nextTick(() => this.ready.values = true);
        //     })
        // );
      }
    }

    private setFirstItem() {

    }

    // getItem() {
    //   let v = Object.assign({}, contentStore.items[this.pageData!.main]);
    //   v.ref = firebase.firestore().doc(v.path);
    //   return v;
    // }

    mounted() {
      console.log("mounted", this.$route.query.id);
    }

    destroyed() {
      // ItemStoreDataMgr.unwatch(this, this.pageData!.main);
      // while (this.unsubscribes.length) {
      //   this.unsubscribes.shift()!();
      // }
    }
  }
</script>

<style lang="scss">
  .module-e {
    position: relative;
    min-height: 1rem;
  }
</style>
