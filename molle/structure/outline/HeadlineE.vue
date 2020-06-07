<template lang="pug">
  .e
    Headline(
      :itemData="itemData"
      :valueData="valueData"
      :styleData="styleData"
    )

    .editer(:status="isEdit?'show':'hidden'")
      button.toggle(@click="isEdit=!isEdit") 閉じる
      div(v-if="isEdit")
        //index
        form(@submit.prevent="itemData.ref.update({index:Number.parseFloat(itemData.index)})")
          label index
            input(type="number" v-model="itemData.index")
          button.btn.btn-link(type="submit") done

        ValueComp(:valueData="valueData" :valueProfile="valueProfile")
        StyleComp(:styleData="styleData" :styleProfile="styleProfile")

        form(@submit.prevent @change="update()")
          select(v-model="itemData.option.lv")
            option(value="h1") h1
            option(value="h2") h2
            option(value="h3") h3
            option(value="h4") h4
            option(value="h5") h5
            option(value="h6") h6

        button.btn.btn-danger(@click="deleteModule()") 削除
</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import ValueComp from "~/components/ValueComp.vue";
  import StyleComp from "~/components/StyleComp.vue";
  import {IStyleStoreData, StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {IValueStoreData, ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";

  @Component({
    components: {StyleComp, ValueComp}
  })
  export default class HeadlineE extends Vue {
    contentStore = contentStore;

    //value setting
    static valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.text]
    });
    valueProfile: ValueProfile = HeadlineE.valueProfile;

    //style setting
    static styleProfile: StyleProfile = new StyleProfile({
      border: false,
      align: StyleAlign.None,
      theme: {default: "", select: ["", "test"]},
      color: {default: "", select: ["", "dark"]},
    });
    styleProfile: StyleProfile = HeadlineE.styleProfile;

    @Prop() itemData?: IItemStoreData;
    valueData: IValueStoreData = {};
    styleData: IStyleStoreData = this.styleProfile.getDefaultData();

    isEdit = true;
    unsubscribes: (() => void)[] = [];

    beforeMount() {
      if (!this.itemData!.option) this.itemData!.option = {};
      if (!this.itemData!.option.lv) {
        this.itemData!.option.lv = "h3";
        this.update();
      }
    }

    mounted() {
      this.valueData.ref = this.itemData!.ref!.parent!.parent!.collection("values").doc(this.itemData!.ref!.id);
      this.valueData.ref!.get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            this.valueData.ref!.set({
              type: this.valueProfile.types[0].val
            });
          } else {
            let data = snap.data();
            if (!data!.type || this.valueProfile.types.every((type) => type.val != data!.type)) {
              this.valueData.ref!.update({
                type: this.valueProfile.types[0].val
              });
            }
          }
        });

      this.styleData.ref = this.itemData!.ref!.parent!.parent!.collection("styles").doc(this.itemData!.ref!.id);
      this.unsubscribes.push(
        this.styleData.ref!.onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            this.styleData.ref!.set({});
            return;
          }
          this.styleData = Object.assign(this.styleData, snap.data());
        })
      );

      this.changeContentStore();
    }

    update() {
      let updateData: IItemStoreData = <IItemStoreData>{};
      updateData.option = this.itemData!.option;

      this.itemData!.ref!.update(updateData);
    }

    @Watch("contentStore.values")
    changeContentStore() {
      // console.log("changeContentStore", contentStore.values[this.itemData!.ref.id]);
      let v = Object.assign({}, contentStore.values[this.itemData!.ref!.id]);
      v.ref = this.valueData.ref;
      this.valueData = v;
    }

    deleteModule() {
      contentStore.removeValue(this.valueData.ref!.id);
      this.itemData!.ref!.delete();
      this.valueData!.ref!.delete();
    }

    destroyed() {
      while (this.unsubscribes.length) {
        this.unsubscribes.shift()!();
      }
    }
  }
</script>

<style lang="scss">
  .e {
  }

  .editer-h {
    position: absolute;

    &[status=hidden] {
      z-index: $zindex-fixed - 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .toggle {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;

        &:hover {
          opacity: 0.1;
        }
      }
    }

    &[status=show] {
      z-index: $zindex-fixed;
      border: 1px solid gray;
      padding: 1rem;
      background-color: lightblue;
    }
  }
</style>
