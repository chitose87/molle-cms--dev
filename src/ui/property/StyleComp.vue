<template lang="pug">
  .style-comp.mr-n3.form-inline
    span.mr-3(v-if="permission.theme!==undefined")
      label
        span.mr-1 Theme:
        select.form-control.form-control-sm(v-model="dataClass.theme" @change="onUpdate('class',dataClass)")
          option(v-for="theme in permission.theme.select" :val="theme" v-html="theme")

    span.mr-3(v-if="permission.color!==undefined")
      label
        span.mr-1 Color:
        select.form-control.form-control-sm(v-model="dataClass.color" @change="onUpdate('class',dataClass)")
          option(v-for="color in permission.color.select" :val="color" v-html="color")

    //container
    span.mr-3(v-if="permission.container!==undefined")
      label
        span.mr-1 container:
        input.form-control.form-control-sm(v-model="dataClass.container" type="checkbox" @change="onUpdate('class',dataClass)")

    //Border
    span.mr-3(v-if="permission.border!==undefined")
      label
        span.mr-1 枠線:
        input.form-control.form-control-sm(v-model="dataClass.border" type="checkbox" @change="onUpdate('class',dataClass)")

    //TextHorizontal
    span.mr-3(v-if="permission.align!==undefined")
      label
        span.mr-1 行揃え:
        select.form-control.form-control-sm(v-model="dataClass.align" @change="onUpdate('class',dataClass)")
          option(v-for="item in styleAlign" :value="item.value" v-html="item.label")

    //span.mr-3
      label Free Area
        textarea(v-model="datacss")

    //margin
    span.mr-3(v-if="permission.margin!==undefined")
      label
        span.mr-1 margin:
        RectFormComp(
          :label="'margin'"
          :value="dataStyle"
          @update="val=>onUpdate('style',val)"
        )

    //padding
    span.mr-3(v-if="permission.padding!==undefined")
      label
        span.mr-1 padding:
        RectFormComp(
          :label="'padding'"
          :value="dataStyle"
          @update="val=>onUpdate('style',val)"
        )

        //input.form-control.form-control-sm(v-if="margin_select=='number'" v-model="margin_number" type="number" min="-5" max="5" step="0.25" @change="margin()")
        //select.form-control.form-control-sm(v-model="margin_select" @change="margin()")
          option(v-for="item in spaceItems" :value="item.value" v-html="item.label")

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import RectFormComp from "~/src/ui/property/RectFormComp.vue";
  import {IItemData} from "~/src/interface";
  import {StyleAlign} from "~/src/Singleton";

  @Component({
    components: {RectFormComp}
  })
  export default class StyleComp extends Vue {
    styleAlign = StyleAlign;

    @Prop() itemData?: IItemData;
    @Prop() onUpdate?: (key: string, forceValue?: any) => void;
    @Prop() permission?: any;
    // data = <IItemStoreData>{class: {}, style: {}};
    dataClass = {};
    dataStyle = {};

    // update(v: string) {
    //   let update: any = Object.assign({}, this.itemData);
    //   update[this.dataKey!] = v;
    //   this.$emit("change", update);
    // }
    created() {
    }

    @Watch("itemData", {immediate: true})
    changeItemData() {
      // this.$set(this, "dataClass", Object.assign({}, this.itemData!.class));
      // this.$set(this, "dataStyle", Object.assign({}, this.itemData!.style));
    }

    update2(key: string, forceValue?: any) {
      //   let update: any = {};
      //   if (forceValue || forceValue === false) {
      //     update[key] = forceValue;
      //   } else {
      //     //@ts-ignore
      //     update[key] = this.data[key];
      //   }
      //   FirestoreMgr.itemUpdate(this.itemData!.id, update);
    }

    //
    // updateRect(val: any) {
    //   console.log(val);
    // }
  }
</script>

<style lang="scss">
  .style-comp {
  }
</style>
