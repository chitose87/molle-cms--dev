<template lang="pug">
  .editView
    .container
      BoxE(
        v-if="children.main && children.main.ref"
        :itemData="children.main"
      )
    //ValueTreeComp(
    //  :pageData="pageData"
    //)

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {InitialValue, setMolleEditerModules} from "~/molle/editer/module";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {IPageStoreData} from "~/molle/interface/IPageStoreData";
  import {Singleton} from "~/molle/Singleton";
  import ValueTreeComp from "~/molle/ui/ValueTreeComp.vue";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

  @Component({
    components: {ValueTreeComp}
  })
  export default class EditView extends Vue {
    store = Singleton.store;
    setMolleEditerModules = setMolleEditerModules();

    @Prop() pageData?: IPageStoreData;

    children = <{
      main: IItemStoreData,
    }>{};
    path: string = "loading";

    // constructor(props: any) {
    //   super(props);
    //   this.pageRef = firebase.firestore().doc(`pages/${this.pageData!.id}`);
    // }

    created() {
      this.changePageData();
    }

    @Watch("pageData")
    changePageData(newer?: IPageStoreData, older?: IPageStoreData) {
      console.log("--changePageData", this.pageData);

      FirestoreMgr.currentPageData = this.pageData!;

      if (!this.pageData!.main) {
        // ルートコンテツエリアが未設定
        firebase.firestore().collection(`items`)
          .add(InitialValue.Box)
          .then((e) => {
            this.pageData!.ref.update({
              main: e
            });
          });
      } else {
        if (newer && older && (newer.main.id == older.main.id)) {
          return;
        }
        FirestoreMgr.addlistener(
          this.pageData!.main,
          (itemData: IItemStoreData) => {
            this.$set(this.children, "main", itemData);
          }, {
            initial: InitialValue.Box,
            once: true,
            force: true,
            watcher: this,
          }
        );
      }
    }

    mounted() {
      console.log("mounted", this.$route.query.id);
    }

    destroyed() {
    }
  }
</script>

<style lang="scss">
  .module-e {
    position: relative;
    min-height: 1rem;
  }
</style>
