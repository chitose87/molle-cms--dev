<template lang="pug">
  .bootstrap.rect-form-comp
    button.btn.btn-secondary(:id="`rect-form-comp`+label")
      span(v-html="rect.all || ([rect.top||'n',rect.right||'n',rect.bottom||'n',rect.left||'n'].join(','))")
    b-popover(
      :target="`rect-form-comp`+label"
      :title="label" triggers="focus"
      placement="bottom"
      container="bootstrap-container")
      div.position-relative.text-center
        button.btn.btn-sm.btn-outline-secondary(
          @click="onSync()"
          style="position:absolute;top:0;right:0;"
        )
          b-icon(icon="link-45deg")
        SpaceFormComp.text-left(:label="'top'" :value="rect.top" @update="v=>updateLine('top',v)")
        div.text-left
          SpaceFormComp.w-50(:label="'left'" :value="rect.left" @update="v=>updateLine('left',v)")
          SpaceFormComp.w-50(:label="'right'" :value="rect.right" @update="v=>updateLine('right',v)")
        SpaceFormComp.text-left(:label="'bottom'" :value="rect.bottom" @update="v=>updateLine('bottom',v)")

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
  import SpaceFormComp from "~/molle/ui/property/SpaceFormComp.vue";

  @Component({
    components: {SpaceFormComp}
  })
  /**
   */
  export default class RectFormComp extends Vue {
    @Prop() value?: any;
    @Prop() label?: string;

    valueData: any = {};

    rect: any = {
      all: "",
      top: "",
      right: "",
      bottom: "",
      left: "",
    };

    created() {
      this.updateValue();
    }

    @Watch("value")
    updateValue() {
      this.$set(this, "valueData", this.value);
      console.log("updateValue")

      this.rect.all = this.value[this.label!];
      this.rect.top = this.value[this.label! + "-top"];
      this.rect.right = this.value[this.label! + "-right"];
      this.rect.bottom = this.value[this.label! + "-bottom"];
      this.rect.left = this.value[this.label! + "-left"];

      if (this.rect.all) {
        this.rect.top = this.rect.all;
        this.rect.left = this.rect.all;
        this.rect.right = this.rect.all;
        this.rect.bottom = this.rect.all;
      }
    }

    updateLine(trbl: string, value: number | string) {
      if (this.valueData[this.label!]) {
        //allだったのに、個別指定に切り替わったので分解しておく
        delete this.valueData[this.label!];
        this.valueData[this.label + "-top"] = this.rect.top;
        this.valueData[this.label + "-right"] = this.rect.right;
        this.valueData[this.label + "-bottom"] = this.rect.bottom;
        this.valueData[this.label + "-left"] = this.rect.left;
      }

      //指定箇所を反映
      this.rect[trbl] = value;
      if (this.rect.top == this.rect.right
        && this.rect.bottom == this.rect.left
        && this.rect.top == this.rect.bottom) {
        //全部一緒になったので、allとして
        this.onSync();
        return;
      }

      //結果を作る
      if (value) {
        this.valueData[this.label + "-" + trbl] = value;
      } else {
        delete this.valueData[this.label + "-" + trbl];
      }
      this.$emit("update", this.valueData);
    }

    onSync() {
      this.valueData[this.label!] = this.rect.top || "";
      delete this.valueData[this.label + "-top"];
      delete this.valueData[this.label + "-right"];
      delete this.valueData[this.label + "-bottom"];
      delete this.valueData[this.label + "-left"];

      this.$emit("update", this.valueData);
    }
  }
</script>

<style lang="scss">
</style>
