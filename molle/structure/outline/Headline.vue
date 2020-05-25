<template lang="pug">
  .module
    span {{itemData.id}}
    span {{itemData.valueRef}}
    span {{itemData.moduleId}}

    form(@submit.prevent="update(`index`)")
      input(type="number" v-model="itemData.index")
      button.btn.btn-link(type="submit") done

    component(
      :is="lv"
    )

    div
      select(v-model="lv" @change="update")
        option h1
        option h2
        option h3
        option h4
        option h5
        option h6

      input(type="text" v-model="text" @change="update")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";

  @Component({
    components: {}
  })
  export default class Headline extends Vue {
    @Prop() itemData?: any;
    text: string = "";
    lv: string = "h3";

    mounted() {
    }

    // change(value: string) {
    //   this.text = value;
    // }

    update(key: string) {
      let updateData: any = {};
      updateData[key] = this.itemData[key];

      firebase.firestore()
        .collection(`pages/${this.$route.query.id}/items`)
        .doc(this.itemData.id)
        .update(updateData);
    }
  }
</script>

<style lang="scss">
  .module {
    border: 1px solid gray;
    padding: 1rem;
  }
</style>
