<template lang="pug">
  .style-comp
    form(@submit.prevent @change="update()")
      //Border
      div(v-if="styleProfile.permission.border")
        label 枠線
          input(v-model="styleData.border" type="checkbox")

      //TextHorizontal
      div(v-if="styleProfile.permission.align")
        label 行揃え
          select(v-model="styleData.align")
            option(v-for="item in styleAlign" :value="item.value" v-html="item.label")

      //
      div(v-if="styleProfile.permission.theme")
        label Style Theme
          select(v-model="styleData.theme")
            option(v-for="theme in styleProfile.themeCollection" :val="theme" v-html="theme")

      div(v-if="styleProfile.permission.color")
        label Color Theme
          select(v-model="styleData.color")
            option(v-for="color in styleProfile.colorCollection" :val="color" v-html="color")

      label Free Area
        textarea(v-model="styleData.css")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {contentStore} from "~/utils/store-accessor";
  import {IStyleStoreData, StyleAlign, StyleProfile} from "~/molle/interface/StyleProfile";

  @Component({
    components: {}
  })
  export default class StyleComp extends Vue {
    contentStore = contentStore;
    styleAlign = StyleAlign;

    @Prop() styleData?: IStyleStoreData;
    @Prop() styleProfile?: StyleProfile;

    mounted() {
    }

    update() {
      this.styleData!.ref!.update(this.styleData!);
    }
  }
</script>

<style lang="scss">
  .style-comp {
  }
</style>
