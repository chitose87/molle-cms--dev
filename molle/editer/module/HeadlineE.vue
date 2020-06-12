<template lang="pug">
  .e
    Headline(
      :itemData="itemData"
      :valueData="valueData"
      :styleData="styleData"
    )

    div(ref="hoge")
      form(@submit.prevent @change="update()")
        select(v-model="itemData.option.lv")
          option(value="h1") h1
          option(value="h2") h2
          option(value="h3") h3
          option(value="h4") h4
          option(value="h5") h5
          option(value="h6") h6

    ModuleEditorComp

    //.editer(:status="isEdit?'show':'hidden'")
      button.toggle(@click="isEdit=!isEdit") 閉じる
      div(v-if="isEdit")
        ValueComp(:valueData="valueData" :valueProfile="valueProfile")
        StyleComp(:styleData="styleData" :styleProfile="styleProfile")

        button.btn.btn-danger(@click="deleteModule()") 削除
</template>

<script lang="ts">
  import {Component} from "~/node_modules/nuxt-property-decorator";
  import ValueComp from "~/components/ValueComp.vue";
  import StyleComp from "~/components/StyleComp.vue";
  import {StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {ValueProfile, ValueType} from "~/molle/interface/ValueProfile";
  import {ModuleE} from "~/molle/editer/module/ModuleE";
  import ModuleEditorComp from "~/components/ModuleEditorComp.vue";

  @Component({
    components: {ModuleEditorComp, StyleComp, ValueComp}
  })
  export default class HeadlineE extends ModuleE {
    //value setting
    static valueProfile: ValueProfile = new ValueProfile({
      types: [ValueType.text]
    });

    //style setting
    static styleProfile: StyleProfile = new StyleProfile({
      border: false,
      align: StyleAlign.None,
      theme: {default: "", select: ["", "test"]},
      color: {default: "", select: ["", "dark"]},
    });

    constructor(...args: any[]) {
      super(args);
      this.valueProfile = HeadlineE.valueProfile;
      this.styleProfile = HeadlineE.styleProfile;
      this.styleData = this.styleProfile.getDefaultData();
    }

    created() {
      this._created();
    }

    mounted() {
      this.changeContentStoreValues();

      console.log(this.$refs['hoge'])
    }

    destroyed() {
      this._destroyed();
    }

    //Unique Methods

    // @Prop() itemData?: IItemStoreData;
    // itemDataRef?: firebase.firestore.DocumentReference;
    // valueData: IValueStoreData = {};
    // styleData: IStyleStoreData = this.styleProfile.getDefaultData();
    //
    // isEdit = true;
    // unsubscribes: (() => void)[] = [];

    // beforeMount() {
    //   this.itemDataRef = firebase.firestore().doc(this.itemData!.path!);
    //   this.valueData.ref = this.itemDataRef.parent!.parent!.collection("values").doc(this.itemDataRef.id);
    //   this.valueData.ref!.get()
    //     .then((snap: firebase.firestore.DocumentSnapshot) => {
    //       if (!snap.exists) {
    //         this.valueData.ref!.set({
    //           type: this.valueProfile.types[0].val
    //         });
    //       } else {
    //         let data = snap.data();
    //         if (!data!.type || this.valueProfile.types.every((type) => type.val != data!.type)) {
    //           this.valueData.ref!.update({
    //             type: this.valueProfile.types[0].val
    //           });
    //         }
    //       }
    //     });
    //
    //   this.styleData.ref = this.itemDataRef.parent!.parent!.collection("styles").doc(this.itemDataRef.id);
    //   this.unsubscribes.push(
    //     this.styleData.ref!.onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
    //       if (!snap.exists) {
    //         this.styleData.ref!.set({});
    //         return;
    //       }
    //       this.styleData = Object.assign(this.styleData, snap.data());
    //     })
    //   );
    //
    //   this.changeContentStore();
    //   //
    //   if (!this.itemData!.option) this.itemData!.option = {};
    //   if (!this.itemData!.option.lv) {
    //     this.itemData!.option.lv = "h3";
    //     this.update();
    //   }
    // }
    //
    // mounted() {
    // }
    //
    // update() {
    //   let updateData: IItemStoreData = <IItemStoreData>{};
    //   updateData.option = this.itemData!.option;
    //
    //   this.itemDataRef!.update(updateData);
    // }
    //
    // @Watch("contentStore.values")
    // changeContentStore() {
    //   // console.log("changeContentStore", contentStore.values[this.itemData!.ref.id]);
    //   let v = Object.assign({}, contentStore.values[this.itemDataRef!.id]);
    //   v.ref = this.valueData.ref;
    //   this.valueData = v;
    // }
    //
    // deleteModule() {
    //   contentStore.removeValue(this.valueData.ref!.id);
    //   this.itemDataRef!.delete();
    //   this.valueData!.ref!.delete();
    // }
    //
    // destroyed() {
    //   while (this.unsubscribes.length) {
    //     this.unsubscribes.shift()!();
    //   }
    // }
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
