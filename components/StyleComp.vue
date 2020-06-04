<template lang="pug">
  .style-comp
    form(@submit.prevent @change="update()")
      //Border
      div(v-if="styleParam.permission.border")
        label 枠線
          input(v-model="styleParam.value.border" type="checkbox")

      //TextHorizontal
      div(v-if="styleParam.permission.align")
        label 行揃え
          select(v-model="styleParam.value.align")
            option(v-for="item in styleAlign" :value="item.value" v-html="item.label")

      //
      div(v-if="styleParam.permission.theme")
        label Style Theme
          select(v-model="styleParam.value.theme")
            option(v-for="theme in styleParam.themeCollection" :val="theme" v-html="theme")

      div(v-if="styleParam.permission.color")
        label Color Theme
          select(v-model="styleParam.value.color")
            option(v-for="color in styleParam.colorCollection" :val="color" v-html="color")

      p
        label Free Area
          textarea()

</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import firebase from "firebase";
  import {contentStore} from "~/utils/store-accessor";
  import {StyleAlign, StyleParam} from "~/molle/structure/StyleParam";
  import {IPageItem} from "~/molle/interface/Page";

  @Component({
    components: {}
  })
  export default class StyleComp extends Vue {
    contentStore = contentStore;
    styleAlign = StyleAlign;

    @Prop() itemData?: IPageItem;
    @Prop() styleParam?: StyleParam;

    mounted() {
      this.updateItemData();
    }

    @Watch("itemData")
    updateItemData() {
      if (this.itemData!.style) {
        Object.assign(this.styleParam!.value, this.itemData!.style);
      }
    }

    update() {
      let updateData: IPageItem = <IPageItem>{};
      updateData.style = this.styleParam!.value;

      this.itemData!.ref.update(updateData);
    }
  }
</script>

<style lang="scss">
  .style-comp {
  }
</style>
