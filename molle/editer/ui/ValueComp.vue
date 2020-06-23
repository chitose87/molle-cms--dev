<template lang="pug">
  .value-comp
    p Extends:
      span(v-html="itemData.extendsId?itemData.extendsId:'継承なし'")
      button(@click="openExtendsModal()") 変更
      b-modal(v-model="extendsModal" centered="" title="BootstrapVue")
        div(v-if="extendsModal")
        .list-group-flush
          button.list-group-item.list-group-item-action(@click="closeExtendsModal(null)")
            span 継承なし
          button.list-group-item.list-group-item-action(v-for="(item,key) in extendsList" @click="closeExtendsModal(key)")
            span(v-html="item.value")
            | /
            span(v-html="item.name||`[ ${key} ]`")
            //span(v-html="item.extends.")?

    form(@submit.prevent @change="update()")
      label name
        input(type="text" v-model="itemData.name")
      p type {{itemData.type}}
      //label type
        select(v-model="itemData.type" )
          option(v-for="(item,key) in valueTypes" :value="key" v-html="item.label")
      label ▼value
        div(v-if="itemData.type === 'text'")
          div(v-if="itemData.superValue")
            span superValue=
            span(v-html="itemData.superValue")
          textarea(v-model="itemData.value")

        input(v-if="itemData.type === 'number'" type="number" v-model="itemData.value" )
        textarea(v-if="itemData.type === 'html'" v-model="itemData.value" )

        div(v-if="itemData.type === 'img'" :func="typeof itemData.value=='object'?false:itemData.value={}")
          label src:
            input(type="text" v-model="itemData.value.src" )
          label sp:
            input(type="text" v-model="itemData.value.sp" )
          label alt:
            input(type="text" v-model="itemData.value.alt" )

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import {IValueStoreData, ValueProfile} from "~/molle/interface/ValueProfile";
  import * as firebase from "~/node_modules/firebase";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";

  @Component({
    components: {}
  })
  /**
   * firestoreのwatchはしない。
   * itemDataのupdateをする。
   */
  export default class ValueComp extends Vue {
    contentStore = contentStore;

    @Prop() itemData?: IItemStoreData;
    @Prop() valueProfile?: ValueProfile;

    extendsModal: boolean = false;
    extendsList: { [key: string]: IValueStoreData } = {};

    openExtendsModal() {
      // let list: { [key: string]: IValueStoreData } = {};
      // // console.log(this.itemData)
      // for (let key in contentStore.values) {
      //   let item: IValueStoreData = contentStore.values[key];
      //   console.log(item);
      //   a:for (let i of this.valueProfile!.types!) {
      //     if (i.val == item.type) {
      //       //not self & parents
      //       let viaId = key;
      //       while (viaId) {
      //         // console.log(viaId, this.itemData!.ref)
      //         if (this.itemData!.path.indexOf(viaId) >= 0) {
      //           continue a;
      //         }
      //         viaId = contentStore.values[viaId].extendsId;
      //       }
      //       list[key] = item;
      //       break;
      //     }
      //   }
      // }
      // this.extendsList = list;
      // this.extendsModal = true;
    }

    closeExtendsModal(id?: string) {
      // this.extendsModal = false;
      // firebase.firestore().doc(this.itemData!.path).update({extendsId: id ? id : ""});
    }

    update() {
      let update: any = {
        name: this.itemData!.name || "",
        type: this.itemData!.type,
      };
      if (this.itemData!.value) update.value = this.itemData!.value;
      this.itemData!.ref.update(update);
    }
  }
</script>

<style lang="scss">
  .value-comp {
    padding: 1rem;
    background-color: lightblue;
  }
</style>
