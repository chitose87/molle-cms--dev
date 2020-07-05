<template lang="pug">
  .style-comp
    h4.mt-0.mb-2.border-bottom Style
    form(@submit.prevent @change="update()")
      //Border
      div(v-if="styleProfile.permission.border")
        label 枠線
          input(v-model="data.style.border" type="checkbox")

      //TextHorizontal
      div(v-if="styleProfile.permission.align")
        label 行揃え
          select(v-model="data.style.align")
            option(v-for="item in styleAlign" :value="item.value" v-html="item.label")

      //
      div(v-if="styleProfile.permission.theme")
        label Style Theme
          select(v-model="data.style.theme")
            option(v-for="theme in styleProfile.themeCollection" :val="theme" v-html="theme")

      div(v-if="styleProfile.permission.color")
        label Color Theme
          select(v-model="data.style.color")
            option(v-for="color in styleProfile.colorCollection" :val="color" v-html="color")

      label Free Area
        textarea(v-model="data.css")

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import {StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

  @Component({
    components: {}
  })
  export default class StyleComp extends Vue {
    styleAlign = StyleAlign;

    @Prop() itemData?: IItemStoreData;
    @Prop() styleProfile?: StyleProfile;
    data = <IItemStoreData>{};

    created() {
      this.changeItemData();
    }

    @Watch("itemData")
    changeItemData() {
      this.$set(this, "data", this.itemData);
    }

    update() {
      FirestoreMgr.itemUpdate(this.itemData!.ref, {
        style: this.data.style
      });
    }
  }
</script>

<style lang="scss">
  .style-comp {
  }
</style>
