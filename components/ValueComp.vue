<template lang="pug">
  .value-comp
    p Extends:
      span(v-html="valueData.extendsId?valueData.extendsId:'継承なし'")
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

    div
      label name
        input(type="text" v-model="valueData.name")
      p type {{valueData.type}}
      //label type
        select(v-model="valueData.type" )
          option(v-for="(item,key) in valueTypes" :value="key" v-html="item.label")
      label ▼value
        div(v-if="valueData.type === 'text'")
          div(v-if="valueData.superValue")
            span superValue=
            span(v-html="valueData.superValue")
          textarea(v-model="valueData.value")

        input(v-if="valueData.type === 'number'" type="number" v-model="valueData.value" )
        textarea(v-if="valueData.type === 'html'" v-model="valueData.value" )

        div(v-if="valueData.type === 'img'" :func="typeof valueData.value=='object'?false:valueData.value={}")
          label src:
            input(type="text" v-model="valueData.value.src" )
          label sp:
            input(type="text" v-model="valueData.value.sp" )
          label alt:
            input(type="text" v-model="valueData.value.alt" )
      button.btn.btn-primary(@click="save()") 保存
      //button.btn(@click="save()") シンボル化
      //button.btn(@click="save()") シンボルから選ぶ

</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {IValue, IValueType, ValueTypes} from "~/molle/interface/Value";

  @Component({
    components: {}
  })
  /**
   * firestoreのwatchはしない。
   * valueDataのupdateをする。
   */
  export default class ValueComp extends Vue {
    contentStore = contentStore;
    valueTypes = ValueTypes;

    @Prop() valueData?: IValue;
    @Prop() types?: IValueType[];
    // @Prop() itemDataRef?: firebase.firestore.DocumentReference;

    extendsModal: boolean = false;
    extendsList: { [key: string]: IValue } = <{ [key: string]: IValue }>{};
    entryDataPoint: IValue = {};

    hoge: any = {};

    // @Watch("valueData.ref")
    // hoge(newer: any, older: any) {
    //   console.log("hoge2", newer.name, older)
    // }
    updateItemDataValueRef(id: string) {
      // let ref = id ? firebase.firestore().doc(`values/${id}`) : "";
      this.valueData!.ref.update({
        extendsId: id
      })
    }

    @Watch("valueData.extendsId")
    changeValueDataExtends(newer: any, older: any) {
      console.log("changeValueDataExtends")
      try {
        // this.age(this.valueData!.extends);
      } catch (e) {
      }
    }

    private age(ex: firebase.firestore.DocumentReference) {
      this.hoge[ex.id] = ex.onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        let v: IValue = <IValue>snap.data();
        this.entryDataPoint.name = v.name;
        this.entryDataPoint.type = v.type;
        this.entryDataPoint.value = v.value;
        // this.entryDataPoint.ref = snap.ref;

        // if (v.extends) {
        //   this.age(v.extends);
        // } else {
        //end point
        // }
      });
    }

    openExtendsModal() {
      let list: { [key: string]: IValue } = <{ [key: string]: IValue }>{};
      // console.log(this.valueData)
      for (let key in contentStore.values) {
        let item: IValue = contentStore.values[key];
        console.log(item);
        a:for (let i of this.types!) {
          if (i.val == item.type) {
            //not self & parents
            let viaId = key;
            while (viaId) {
              // console.log(viaId, this.valueData!.ref)
              if (viaId == this.valueData!.ref.id) {
                continue a;
              }
              viaId = contentStore.values[viaId].extendsId;
            }
            list[key] = item;
            break;
          }
        }
      }
      this.extendsList = list;
      this.extendsModal = true;
    }

    closeExtendsModal(id?: string) {
      this.extendsModal = false;
      this.valueData!.ref.update({extendsId: id ? id : ""});
    }

    save() {
      let update: IValue = {
        name: this.valueData!.name || "",
        type: this.valueData!.type,
      };
      if (this.valueData!.value) update.value = this.valueData!.value;
      this.valueData!.ref.update(update);
    }
  }
</script>

<style lang="scss">
  .value-comp {
    padding: 1rem;
    background-color: lightblue;
  }
</style>
