<template lang="pug">
  .bootstrap.space-form-comp.d-inline-block
    label
      span.mr-1 {{label}}:
      div
        .u_auto-input.d-inline-block(v-if="valueSelected==='number'")
          span.u_auto-input__static.form-control.form-control-sm.pr-4(v-html="valueNumber || '0'")
          input.u_auto-input__input.form-control.form-control-sm(
            v-model="valueNumber"
            type="number"
            :min="negative !== false?-5:0" max="5" step="0.25"
            @input="update()")
        .u_auto-input.d-inline-block
          span.u_auto-input__static.form-control.form-control-sm.pr-4(v-html="valueSelectedLabel || ''")
          select.u_auto-input__input.form-control.form-control-sm(v-model="valueSelected" @change="update()")
            option(v-for="item in spaceItems" :value="item.value" v-html="item.label")

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  /**
   */
  export default class SpaceFormComp extends Vue {
    @Prop() value?: string | number;
    @Prop() label?: string;
    @Prop() negative?: boolean;
    valueData: string = "";

    valueNumber = 1;
    valueSelected = "";
    valueSelectedLabel = "";
    spaceItems = [
      {value: "", label: "none"},
      {value: "0gutter", label: "0"},
      {value: "auto", label: "auto"},
      {value: "number", label: "rem"}
    ];

    created() {
      // this.updateValue();
      this.spaceItems.push({value: "1gutter", label: "gutter"});
      this.spaceItems.push({value: "0.75gutter", label: "gutter*0.75"});
      this.spaceItems.push({value: "0.5gutter", label: "gutter*0.5"});
      this.spaceItems.push({value: "0.25gutter", label: "gutter*0.25"});
      if (this.negative !== false) {
        this.spaceItems.push({value: "-0.25gutter", label: "-gutter*0.25"});
        this.spaceItems.push({value: "-0.5gutter", label: "-gutter*0.5"});
        this.spaceItems.push({value: "-0.75gutter", label: "-gutter*0.75"});
        this.spaceItems.push({value: "-1gutter", label: "-gutter"});
      }
    }

    @Watch("value", {immediate: true})
    updateValue() {
      this.$set(this, "valueData", this.value);

      for (let item of this.spaceItems) {
        if (!this.valueData || this.valueData == item.value) {
          this.valueSelected = <string>this.valueData;
          this.valueSelectedLabel = item.label || "n";
          this.valueNumber = 1;
          return;
        }
      }
      this.valueSelected = "number";
      this.valueSelectedLabel = "rem";
      this.valueNumber = parseFloat(this.valueData);
      return;
    }

    update() {
      if (this.valueSelected == "number") {
        this.valueData = this.valueNumber + "rem";
      } else {
        this.valueData = this.valueSelected;
      }
      this.$emit("update", this.valueData);
    }
  }
</script>

<style lang="scss">
</style>
