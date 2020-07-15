<template lang="pug">
  .editView
    .container
      BoxE(
        v-if="pageData.main"
        :itemId="pageData.main"
      )
      //BoxE(
      //  v-if="children.main && children.main.ref"
      //  :itemId="children.main"
      //)
    ModuleTreeComp
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
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
  import ValueTreeComp from "~/molle/ui/ValueTreeComp.vue";
  import ModuleTreeComp from "~/molle/ui/ModuleTreeComp.vue";

  @Component({
    components: {ModuleTreeComp, ValueTreeComp}
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
              main: e.id
            });
          });
      } else {
        if (newer && older && (newer.main == older.main)) {
          return;
        }
        // FirestoreMgr.addlistener(
        //   this.pageData!.main,
        //   (itemData: IItemStoreData) => {
        //     this.$set(this.children, "main", itemData);
        //   }, {
        //     initial: InitialValue.Box,
        //     once: true,
        //     force: true,
        //     watcher: this,
        //   }
        // );
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
