<template lang="pug">
  .module
    component(
      :is="lv"
      v-html="valueData.value || valueData.superValue"
    )
    //span {{itemData.id}}
    //span {{itemData.valueRef}}
    //span {{itemData.moduleId}}

    .editer(:status="isEdit?'show':'hidden'")
      button.toggle(@click="isEdit=!isEdit") 閉じる
      div(v-if="isEdit")
        //index
        form(@submit.prevent="itemData.ref.update({index:Number.parseFloat(itemData.index)})")
          label index
            input(type="number" v-model="itemData.index")
          button.btn.btn-link(type="submit") done

        ValueComp(:valueData="valueData" :types="types")

        div
          select(v-model="lv")
            option h1
            option h2
            option h3
            option h4
            option h5
            option h6

          //input(type="text" v-model="text" @change="update")
        button.btn.btn-danger(@click="deleteModule()") 削除
</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {IPageItem, IPageItemType} from "~/molle/interface/Page";
  import {IValue, IValueType, ValueTypes} from "~/molle/interface/Value";
  import ValueComp from "~/components/ValueComp.vue";

  @Component({
    components: {ValueComp}
  })
  export default class Headline extends Vue {
    contentStore = contentStore;
    valueTypes = ValueTypes;

    @Prop() itemData?: IPageItem;
    readonly types: IValueType[] = [ValueTypes.text];

    isEdit = true;
    valueData: IValue = {ref: {}};
    text: string = "";
    lv: string = "h3";
    //value
    unsubscribe?: () => void;
    weit: number = 0;

    // v: string = "";


    mounted() {
      // console.log("mounted", this.itemData!.ref.id, this.itemData!.valueRef)
      // if (this.itemData && !this.itemData!.valueRef) {
      //   this.itemData.ref.update({valueRef: firebase.firestore().doc(`values/${this.itemData.ref.id}`)});
      // } else {
      this.changeItemData(null, null)
      // }
    }

    updateItemData(key: IPageItemType) {
      let updateData: IPageItem = <IPageItem>{};
      updateData[key] = this.itemData![key];

      this.itemData!.ref.update(updateData);
    }

    /**
     *
     * @param newer
     * @param older
     */
    @Watch("itemData")
    @Watch("contentStore.values")
    changeItemData(newer: any, older: any) {

      console.log("changeItemData", contentStore.values[this.itemData!.ref.id])
      let v = Object.assign({}, contentStore.values[this.itemData!.ref.id]);
      v.type = v.type || this.types[0].val;
      v.ref = this.itemData!.ref.parent.parent.collection("values").doc(this.itemData!.ref.id);
      v.ref.get().then((snap: firebase.firestore.DocumentSnapshot) => {
        let data = snap.data() || {};
        let flag = false;
        if (
          !data.type
          || this.types.every((type) => type != data.type)
        ) {
          data.type = this.types[0].val;
          flag = true;
        }
        if (flag) v.ref.update(data);
      });
      this.valueData = v;
    }

    deleteModule() {
      contentStore.removeValue(this.valueData.ref.id);
      this.itemData!.ref.delete();
      this.valueData!.ref.delete();
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
    destroyed() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }
</script>

<style lang="scss">
  .module {
    position: relative;
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
