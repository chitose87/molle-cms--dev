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
      div(v-if="itemData.valueRef")
        label valueRef
          select(:value="itemData.valueRef.id" @change="updateItemDataValueRef($event.target.value)")
            option(v-for="(item,key) in contentStore.values"
              :value="key"
              v-html="item.displayName||`[ ${key} ]`"
            )
      //ValueComp(:valueRef="itemData.valueRef" :hoge="(v)=>{this.v=v}")

    component(
      :is="lv"
      v-html="v"
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
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import ValueComp from "~/components/ValueComp.vue";
  import {IPageItem, IPageItemType} from "~/molle/interface/Page";

  @Component({
    components: {ValueComp}
  })
  export default class Headline extends Vue {
    contentStore = contentStore;

    @Prop() itemData?: IPageItem;
    text: string = "";
    lv: string = "h3";

    v: string = "";


    mounted() {

      console.log("mounted", this.itemData!.valueRef)
      if (!this.itemData!.valueRef) {
        this.itemData!.valueRef = firebase.firestore().doc(`values/${this.itemData!.id}`);
      }
    }


    updateItemData(key: IPageItemType) {
      let updateData: IPageItem = <IPageItem>{};
      updateData[key] = this.itemData![key];

      firebase.firestore()
        .collection(`pages/${this.$route.query.id}/items`)
        .doc(this.itemData!.id)
        .update(updateData);
    }

    updateItemDataValueRef(id: string) {
      firebase.firestore()
        .collection(`pages/${this.$route.query.id}/items`)
        .doc(this.itemData!.id)
        .update({
          valueRef: firebase.firestore().doc(`values/${id}`)
        });
    }
  }
</script>

<style lang="scss">
  .module {
    border: 1px solid gray;
    padding: 1rem;
  }
</style>
