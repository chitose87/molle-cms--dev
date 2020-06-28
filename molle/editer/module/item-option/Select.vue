<template lang="pug">
  .item-option-select
    label {{profile.label}}
      select(:value="itemData.option[profile.id]" @change="update($event.target.value)")
        option(v-for="item in profile.select" :value="item" v-html="item")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import * as firebase from "~/node_modules/firebase";
  import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

  @Component({
    components: {}
  })
  /**
   */
  export default class ItemOptionSelect extends Vue {
    @Prop() profile?: ItemOptionSelectProfile;
    @Prop() itemData?: IItemStoreData;

    created() {
      if (!this.itemData!.option) this.itemData!.option = {};
    }

    update(v: string) {
      let update: any = {option: {}};
      update.option[this.profile!.id] = v;
      FirestoreMgr.itemUpdate(this.itemData!.ref, update);
      // this.itemData!.ref.update(update);
    }
  }

  export class ItemOptionSelectProfile {
    name: string = "ItemOptionSelect";

    id: string;
    label: string;
    // default: string;
    select: string[];

    constructor(opt: {
      id: string,
      label: string,
      // default: string,
      select: string[]
    }) {
      this.id = opt.id;
      this.label = opt.label;
      // this.default = opt.default;
      this.select = opt.select;
    }
  }
</script>

<style lang="scss">
</style>
