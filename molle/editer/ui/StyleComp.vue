<template lang="pug">
  .style-comp
    form(@submit.prevent @change="update()")
      //Border
      div(v-if="styleProfile.permission.border")
        label 枠線
          input(v-model="style.border" type="checkbox")

      //TextHorizontal
      div(v-if="styleProfile.permission.align")
        label 行揃え
          select(v-model="style.align")
            option(v-for="item in styleAlign" :value="item.value" v-html="item.label")

      //
      div(v-if="styleProfile.permission.theme")
        label Style Theme
          select(v-model="style.theme")
            option(v-for="theme in styleProfile.themeCollection" :val="theme" v-html="theme")

      div(v-if="styleProfile.permission.color")
        label Color Theme
          select(v-model="style.color")
            option(v-for="color in styleProfile.colorCollection" :val="color" v-html="color")

      label Free Area
        textarea(v-model="itemData.css")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import {IStyleStoreData, StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import * as firebase from "~/node_modules/firebase";

  @Component({
    components: {}
  })
  export default class StyleComp extends Vue {
    contentStore = contentStore;
    styleAlign = StyleAlign;

    @Prop() itemData?: IItemStoreData;
    @Prop() styleProfile?: StyleProfile;

    style: any = Object.assign({}, this.itemData!.style);

    mounted() {
    }

    update() {
      this.itemData!.ref.update({
        style: this.style
      })
      // this.itemData!.ref!.update(this.itemData!);
    }
  }
</script>

<style lang="scss">
  .style-comp {
  }
</style>
