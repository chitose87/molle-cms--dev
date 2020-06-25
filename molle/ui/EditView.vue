<template lang="pug">
  .editView
    .container
      //p editView
      //| {{Object.keys(store.items)}}
      //| {{pageData.main.id}}
      BoxE(
        v-if="children.main && children.main.ref"
        :itemData="children.main"
      )
    ValueTreeComp

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {BoxInitial, setMolleEditerModules} from "~/molle/editer/module";
  import {IItemStoreData, ItemProfile} from "~/molle/interface/ItemProfile";
  import {ItemStoreDataMgr} from "~/molle/editer/ItemStoreDataMgr";
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
        FirestoreMgr.addlistener(
          this.pageData!.main,
          (itemData: IItemStoreData) => {
            this.$set(this.children, "main", itemData);

            FirestoreMgr.removelistener(this.pageData!.main.id, this);
          }, {
            initial: BoxInitial,
            // once: true,
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
