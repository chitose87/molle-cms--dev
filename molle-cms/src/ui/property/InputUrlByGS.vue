<template lang="pug">
label.w-100
  span {{label}}
  input.form-control.form-control-sm(
    type="url"
    v-model="localValue"
    @change="(e)=>validation(e.target.value)"
    placeholder="https://---"
  )

</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "nuxt-property-decorator";
import {OptionComp} from "./OptionComp";

@Component({
  components: {},
})
/**
 */
export default class InputUrlByGS extends OptionComp {

  validation(str: string) {
    if (/firebasestorage.googleapis.com/.test(str)) {
      str = str.match(".+/(.+?)([\?#;].*)?$")![1];
      str = `https://storage.googleapis.com/${process.env.storageBucket}/${decodeURIComponent(str)}`;
      this.$set(this, "localValue", str);
    }
    this.$emit("change");
  }
}
</script>

<style lang="scss">
</style>
