<template lang="pug">
  .style-comp
    form.mr-n3.form-inline(@submit.prevent @change="update()")
      //
      span.mr-3(v-if="styleProfile.permission.theme")
        label
          span.mr-1 Theme:
          select.form-control.form-control-sm(v-model="data.class.theme")
            option(v-for="theme in styleProfile.themeCollection" :val="theme" v-html="theme")

      span.mr-3(v-if="styleProfile.permission.color")
        label
          span.mr-1 Color:
          select.form-control.form-control-sm(v-model="data.class.color")
            option(v-for="color in styleProfile.colorCollection" :val="color" v-html="color")

      //Border
      span.mr-3(v-if="styleProfile.permission.border")
        label
          span.mr-1 枠線:
          input.form-control.form-control-sm(v-model="data.class.border" type="checkbox")

      //TextHorizontal
      span.mr-3(v-if="styleProfile.permission.align")
        label
          span.mr-1 行揃え:
          select.form-control.form-control-sm(v-model="data.class.align")
            option(v-for="item in styleAlign" :value="item.value" v-html="item.label")

      //span.mr-3
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
      FirestoreMgr.itemUpdate(this.itemData!.id, {
        class: this.data.class
      });
    }
  }
</script>

<style lang="scss">
  .style-comp {
  }
</style>
