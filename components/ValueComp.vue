<template lang="pug">
  .value-comp
    span ValueComp
    label(v-if="valueData.ref") valueRef
      select(:value="valueData.ref.id" @change="updateItemDataValueRef($event.target.value)")
        option(v-for="(item,key) in contentStore.values"
          :value="key"
          v-html="item.name||`[ ${key} ]`"
        )

    div
      //label name
        input(type="text" v-model="valueData.name")
      p type {{valueData.type}}
      //label type
        select(v-model="valueData.type" )
          option(v-for="(item,key) in valueTypes" :value="key" v-html="item.label")
      label value
        input(v-if="valueData.type === 'text'" type="text" v-model="valueData.value" )
        input(v-if="valueData.type === 'number'" type="number" v-model="valueData.value" )
        textarea(v-if="valueData.type === 'html'" v-model="valueData.value" )
        textarea(v-if="valueData.type === 'paragraph'" v-model="valueData.value" )

        div(v-if="valueData.type === 'img'" :func="typeof valueData.value=='object'?false:valueData.value={}")
          label src:
            input(type="text" v-model="valueData.value.src" )
          label sp:
            input(type="text" v-model="valueData.value.sp" )
          label alt:
            input(type="text" v-model="valueData.value.alt" )
      button.btn(@click="save()") 保存

</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {IValue, ValueTypes} from "~/molle/interface/Value";

  @Component({
    components: {}
  })
  /**
   * firestoreのwatchはしない。
   * itemData.valueRefとvalueDataのupdateをする。
   */
  export default class ValueComp extends Vue {
    contentStore = contentStore;
    valueTypes = ValueTypes;

    @Prop() valueData?: IValue;
    @Prop() itemDataRef?: firebase.firestore.DocumentReference;

    // @Watch("valueData.ref")
    // hoge(newer: any, older: any) {
    //   console.log("hoge2", newer.name, older)
    // }
    updateItemDataValueRef(id: string) {
      this.itemDataRef!.update({
        valueRef: firebase.firestore().doc(`values/${id}`)
      })
      // firebase.firestore()
      //   .collection(`pages/${this.$route.query.id}/items`)
      //   .doc(this.itemData!.id)
      //   .update({
      //     valueRef: firebase.firestore().doc(`values/${id}`)
      //   });
    }


    save() {
      let update: IValue = {
        name: this.valueData!.name,
        type: this.valueData!.type,
        value: this.valueData!.value,
      };
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
