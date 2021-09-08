<template lang="pug">
.google-storage.border.p-2.mt-3
  label Google Storage
  a.btn.btn-info.btn-sm.btn-block.mb-2(
    @click="()=>$root.$emit('google-storage-view')"
  )
    span {{$words.export}}
  a.btn.btn-info.btn-sm.btn-block(
    @click="()=>$root.$emit('google-storage-upload',(url)=>{uploaded=url})"
  )
    span {{$words.upload}}

  div(v-if="uploaded")
    label {{$words.complete}}
      input.form-control.form-control-sm(:value="uploaded")

</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
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
