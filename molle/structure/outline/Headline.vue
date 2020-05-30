<template lang="pug">
  .module
    span {{itemData.id}}
    //span {{itemData.valueRef}}
    span {{itemData.moduleId}}

    //index
    form(@submit.prevent="updateItemData(`index`)")
      label index
        input(type="number" v-model="itemData.index")
      button.btn.btn-link(type="submit") done

    div(v-if="contentStore.values")
      span contentStore.values
      div(v-if="valueData.ref.id")
        ValueComp(:valueData="valueData" :itemDataRef="itemData.ref")
        //span {{valueData.name}}



      //ValueComp(:valueRef="itemData.valueRef" :hoge="(v)=>{this.v=v}")

    component(
      :is="lv"
      v-html="valueData.value"
    )
    div
      select(v-model="lv")
        option h1
        option h2
        option h3
        option h4
        option h5
        option h6

      //input(type="text" v-model="text" @change="update")

</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  // import ValueComp from "~/components/ValueComp.vue";
  import {IPageItem, IPageItemType} from "~/molle/interface/Page";
  import {IValue, ValueTypes} from "~/molle/interface/Value";
  import ValueComp from "~/components/ValueComp.vue";

  @Component({
    components: {ValueComp}
  })
  export default class Headline extends Vue {
    contentStore = contentStore;
    valueTypes = ValueTypes;

    @Prop() itemData?: IPageItem;

    valueData: IValue = {ref: {}};
    text: string = "";
    lv: string = "h3";
    //value
    unsubscribe?: () => void;
    weit: number = 0;

    // v: string = "";


    mounted() {
      console.log("mounted", this.itemData!.ref.id, this.itemData!.valueRef)
      if (this.itemData && !this.itemData!.valueRef) {
        this.itemData.ref.update({valueRef: firebase.firestore().doc(`values/${this.itemData.ref.id}`)});
      } else {
        this.changeItemData(null, null)
      }
    }

    updateItemData(key: IPageItemType) {
      let updateData: IPageItem = <IPageItem>{};
      updateData[key] = this.itemData![key];

      firebase.firestore()
        .collection(`pages/${this.$route.query.id}/items`)
        .doc(this.itemData!.ref.id)
        .update(updateData);
    }

    /**
     *
     * @param newer
     * @param older
     */
    @Watch("itemData")
    changeItemData(newer: any, older: any) {
      // console.log("changeItemData")
      if (this.unsubscribe) this.unsubscribe();

      this.unsubscribe = this.itemData!.valueRef
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            snap.ref.set({});
          } else {
            let v: IValue = <IValue>snap.data();
            this.valueData.name = v.name;
            this.valueData.type = v.type;
            this.valueData.value = v.value;
            this.valueData.ref = snap.ref;
          }
        });
    }

    updateValueData() {
      // window.clearTimeout(this.weit);
      // this.weit = window.setTimeout((valueRef: firebase.firestore.DocumentReference, valueData: IValue) => {
      //   console.log("updateValueData", valueRef, valueData)
      //   valueRef.update(valueData);
      // }, 1000, this.itemData!.valueRef, this.valueData);
    }

    // @Watch("valueData")
    // hoge(newer: any, older: any) {
    //   console.log("hoge", newer.name, older)
    // }
  }
</script>

<style lang="scss">
  .module {
    border: 1px solid gray;
    padding: 1rem;
  }
</style>
