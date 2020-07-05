<template lang="pug">
  .value-comp
    h4.mt-0.mb-2.border-bottom Value
    p Extends:
      span(v-html="data.extends?data.extends.id:'継承なし'")
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
        input(type="text" v-model="data.name")
      p type {{data.type}}
      //label type
        select(v-model="data.type" )
          option(v-for="(item,key) in valueTypes" :value="key" v-html="item.label")
      label ▼value
        div(v-if="data.type === 'text'")
          div(v-if="data.superValue")
            span superValue=
            span(v-html="data.superValue")
          textarea(v-model="data.value")

        input(v-if="data.type === 'number'" type="number" v-model="data.value" )
        textarea(v-if="data.type === 'html'" v-model="data.value" )

        div(v-if="data.type === 'img'" :func="typeof data.value=='object'?false:data.value={}")
          label src:
            input(type="text" v-model="data.value.src" )
          label sp:
            input(type="text" v-model="data.value.sp" )
          label alt:
            input(type="text" v-model="data.value.alt" )

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
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
    data = <IItemStoreData>{};

    extendsModal: boolean = false;
    extendsList: { [key: string]: IItemStoreData } = {};

    created() {
      this.changeItemData();
    }

    @Watch("itemData")
    changeItemData() {
      this.$set(this, "data", this.itemData);
    }

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
        name: this.data.name || "",
        type: this.data.type,
        // updateTime: firebase.firestore.FieldValue.serverTimestamp()
      };
      if (this.data.value) update.value = this.data.value;
      // this.itemData!.ref.update(update);

      FirestoreMgr.itemUpdate(this.itemData!.ref, update)
    }
  }
</script>

<style lang="scss">
  .value-comp {
    /*padding: 1rem;*/
    /*background-color: lightblue;*/
  }
</style>
