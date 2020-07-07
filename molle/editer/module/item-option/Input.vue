<template lang="pug">
  .item-option-input
    label
      span.mr-1 {{profile.label}}:
      input.form-control.form-control-sm(type="text" :value="itemData.option[profile.id]" @change="update($event.target.value)")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IItemStoreData} from "~/molle/interface/ItemProfile";
  import {FirestoreMgr} from "../../FirestoreMgr";

  @Component({
    components: {}
  })
  /**
   */
  export default class ItemOptionInput extends Vue {
    @Prop() profile?: ItemOptionInputProfile;
    @Prop() itemData?: IItemStoreData;

    created() {
      if (!this.itemData!.option) this.itemData!.option = {};
    }

    update(v: string) {
      let update: any = {option: {}};
      update.option[this.profile!.id] = v;
      FirestoreMgr.itemUpdate(this.itemData!.ref, update);
    }
  }

  export class ItemOptionInputProfile {
    name: string = "ItemOptionInput";

    id: string;
    label: string;
    value: string = "";

    constructor(opt: {
      id: string,
      label: string
    }) {
      this.id = opt.id;
      this.label = opt.label;
    }
  }
</script>

<style lang="scss">
</style>
