<template lang="pug">
.google-storage.border.p-2.mt-3
  label Google Storage
  details.molle-guide
    summary
    .molle-guide__body.caption
      p 一覧(Explorer)ボタンはGoogleStorageへのリンクです。リンク先でGoogleStorageに保存されているファイルが確認できます。
      p アップロード(Upload)ボタンからGoogleStorageへのファイルアップロードができます。<br>
        | 使用例：アップロードボタンから画像ファイルをアップロードすると、「完了(complete)」欄が表示されます。
        | 「完了(complete)」欄に保存先URLが表示されるので、そのURLを画像URLの入力欄に入力します。

  a.btn.btn-info.btn-sm.btn-block.mb-2(
    @click="()=>$root.$emit('google-storage-view')"
  )
    span {{$words.explorer}}
  a.btn.btn-info.btn-sm.btn-block(
    @click="()=>$root.$emit('google-storage-upload',(url)=>{uploaded=url})"
  )
    span {{$words.upload}}

  div(v-if="uploaded")
    label {{$words.complete}}
      input.form-control.form-control-sm(
        type="url"
        :value="uploaded"
      )

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
