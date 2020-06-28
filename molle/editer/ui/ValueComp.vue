<template lang="pug">
  .value-comp
    p Extends:
      span(v-html="itemData.extends?itemData.extends.id:'継承なし'")
      button(@click="openExtendsModal()") 変更
      b-modal(v-model="extendsModal" centered="" title="Change Extends")
        div(v-if="extendsModal")
        .list-group-flush
          button.list-group-item.list-group-item-action(@click="closeExtendsModal(null)")
            span 継承なし
          button.list-group-item.list-group-item-action(v-for="(item,key) in extendsList" @click="closeExtendsModal(item)")
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
  import {ValueProfile} from "~/molle/interface/ValueProfile";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
  import {Singleton} from "~/molle/Singleton";

  @Component({
    components: {}
  })
  /**
   * firestoreのwatchはしない。
   * itemDataのupdateをする。
   */
  export default class ValueComp extends Vue {

    @Prop() itemData?: IItemStoreData;
    @Prop() valueProfile?: ValueProfile;

    extendsModal: boolean = false;
    extendsList: { [key: string]: IItemStoreData } = {};

    openExtendsModal() {
      let list: { [key: string]: IItemStoreData } = {};
      // console.log(this.itemData)
      for (let id in Singleton.store.items) {
        let item = Singleton.store.items[id];
        // console.log("--------------", item, this.valueProfile!.types);
        a:for (let i of this.valueProfile!.types) {
          // console.log(i)
          if (i.val == item.type) {
            //not self & parents
            let viaId = id;
            while (viaId) {
              // console.log(viaId, this.itemData)
              if (this.itemData!.ref.path.indexOf(viaId) >= 0) {
                continue a;
              }
              if (Singleton.store.items[viaId].extends) {
                viaId = Singleton.store.items[viaId].extends.id;
              } else {
                break;
              }
            }
            list[id] = item;
            break;
          }
        }
      }
      this.extendsList = list;
      this.extendsModal = true;
    }

    closeExtendsModal(itemData?: IItemStoreData) {
      this.extendsModal = false;
      // console.log(this.itemData!.ref.id, itemData)
      FirestoreMgr.itemUpdate(this.itemData!.ref, {extends: itemData ? itemData!.ref : null})
    }

    update() {
      let update: any = {
        name: this.itemData!.name || "",
        type: this.itemData!.type,
        // updateTime: firebase.firestore.FieldValue.serverTimestamp()
      };
      if (this.itemData!.value) update.value = this.itemData!.value;
      // this.itemData!.ref.update(update);

      FirestoreMgr.itemUpdate(this.itemData!.ref, update)
    }
  }
</script>

<style lang="scss">
  .value-comp {
    padding: 1rem;
    background-color: lightblue;
  }
</style>
