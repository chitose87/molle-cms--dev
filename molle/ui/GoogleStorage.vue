<template lang="pug">
.google-storage.border.p-2.mt-3
  label Google Storage
  a.btn.btn-info.btn-sm.btn-block.mb-2(
    @click="()=>$root.$emit('google-storage-view')"
  )
    span Explorer
  a.btn.btn-info.btn-sm.btn-block(
    @click="()=>$root.$emit('google-storage-upload',(url)=>{uploaded=url})"
  )
    span Upload

  div(v-if="uploaded")
    label Complete
      input.form-control.form-control-sm(:value="uploaded")

</template>

<script lang="ts">
import {Component, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import firebase from "firebase";

@Component({
  components: {},
})
export default class GoogleStorage extends Vue {
  uploaded = "";
}
</script>

<style lang="scss">
</style>
