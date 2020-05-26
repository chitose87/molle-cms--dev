<template lang="pug">
  .value-comp(v-if="valueRef")
    span ValueComp
    p
      span ID:
      span(v-html="getId()")
    div(v-if="valueMeta")
      form(@submit.prevent="updateValueMeta(`displayName`)")
        label valueMeta.displayName
          input(type="text" v-model="valueMeta.displayName")
        button.btn.btn-link(type="submit") 更新

      //form(@submit.prevent="updateValueMeta(`displayName`)")
        label valueMeta.displayName
          input(type="text" v-model="valueMeta.displayName")
        button.btn.btn-link(type="submit") 更新

    hr
    div(v-if="valueBody")
      div(v-for="(item,key) in valueBody")
        form(@submit.prevent="updateField(key)")
          span {{key}} |
          label Type:
            select(v-model="item.type")
              option(v-for="(item,key) in $fieldType"
                :value="key" v-html="item.label"
              )
          label Value:
            input(v-if="item.type === 'text'" type="text" v-model="item.value")
            input(v-if="item.type === 'number'" type="number" v-model="item.value")
            textarea(v-if="item.type === 'html'" v-model="item.value")
            textarea(v-if="item.type === 'paragraph'" v-model="item.value")

            div(v-if="item.type === 'img'"
              :func="typeof item.value=='object'?false:item.value={}")
              label src:
                input(type="text" v-model="item.value.src")
              label sp:
                input(type="text" v-model="item.value.sp")
              label alt:
                input(type="text" v-model="item.value.alt")
          button.btn.btn-link(type="submit") 更新

      // add
      hr
      form(@submit.prevent="pushField()")
        label Key:
          input(v-model="addField.key")
        label Type:
          select(v-model="addField.type")
            option(v-for="(item,key) in $fieldType"
              :value="key" v-html="item.label"
            )
        label Value:
          input(v-if="addField.type === 'text'" type="text" v-model="addField.value")
          input(v-if="addField.type === 'number'" type="number" v-model="addField.value")
          textarea(v-if="addField.type === 'html'" v-model="addField.value")
          textarea(v-if="addField.type === 'paragraph'" v-model="addField.value")

          div(v-if="addField.type === 'img'"
            :func="typeof addField.value=='object'?false:addField.value={}")
            label src:
              input(type="text" v-model="addField.value.src")
            label sp:
              input(type="text" v-model="addField.value.sp")
            label alt:
              input(type="text" v-model="addField.value.alt")
        button.btn.btn-secondary(type="submit") 追加
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class ValueComp extends Vue {
    contentStore = contentStore;
    @Prop() valueRef?: firebase.firestore.DocumentReference;
    private id: string = "";

    valueMeta: any = {};
    valueBody: any = {};

    unsubscribeMeta?: () => void;
    unsubscribeBody?: () => void;

    addField: any = {
      type: "text",
      key: "",
      value: <any>""
    };

    /**
     *
     */
    getId() {
      if (this.id != this.valueRef!.id) {
        this.id = this.valueRef!.id;

        if (this.unsubscribeMeta) this.unsubscribeMeta();
        if (this.unsubscribeBody) this.unsubscribeBody();

        this.unsubscribeMeta = this.valueRef!
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) {
              snap.ref.set({});
            } else {
              this.valueMeta = snap.data();
            }
          });

        this.unsubscribeBody = firebase.firestore().doc(`${this.valueRef!.path}/body/val`)
          .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) {
              snap.ref.set({});
            } else {
              this.valueBody = snap.data();
            }
          });
      }

      return this.id;
    }

    /**
     *
     * @param key
     */
    updateValueMeta(key: string) {
      let updateData: any = {};
      updateData[key] = this.valueMeta[key];

      this.valueRef!.update(updateData);
    }

    /**
     *
     */
    pushField() {
      if (!this.addField.key || !this.addField.value) {
        return;
      }

      let updateData: any = {};
      updateData[this.addField.key] = {
        type: this.addField.type,
        value: this.addField.value
      };
      firebase.firestore().doc(`${this.valueRef!.path}/body/val`)
        .update(updateData);

      this.addField.key = "";
      this.addField.value = "";
    }

    /**
     *
     * @param key
     */
    updateField(key: string) {
      let updateData: any = {};
      updateData[key] = this.valueBody[key];
      firebase.firestore().doc(`${this.valueRef!.path}/body/val`)
        .update(updateData);
    }
  }
</script>

<style lang="scss">
  .value-comp {
    padding: 1rem;
    background-color: lightblue;
  }
</style>
