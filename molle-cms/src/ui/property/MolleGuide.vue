<template lang="pug">
details.molle-guide(v-if="propertyItem=='lv'")
  summary
  .molle-guide__body.caption
    p 見出しのレベルです。見出しはh1～h6の6段階でWEBサイトの階層構造を示します。

details.molle-guide(v-else-if="propertyItem=='tag'")
  summary
  .molle-guide__body.caption
    p 任意のhtmlタグをつける時に指定します。

details.molle-guide(v-else-if="propertyItem=='bg'")
  summary
  .molle-guide__body.caption
    p 使用する画像が保存されているURLを入力します。

details.molle-guide(v-else-if="propertyItem=='gs'")
  summary
  .molle-guide__body.caption
    p 一覧ボタンはGoogleStorageへのリンクです。リンク先でGoogleStorageに保存されているファイルが確認できます。
    p アップロードボタンからGoogleStorageへのファイルアップロードができます。<br>
      | 使用例：アップロードボタンから画像ファイルをアップロードすると、「{{$words.complete}}」欄が表示されます。
      | 「{{$words.complete}}」欄に保存先URLが表示されるので、そのURLを画像URLの入力欄に入力します。

details.molle-guide(v-else-if="propertyItem=='url'")
  summary
  .molle-guide__body.caption
    p リンク先URLを入力します。

details.molle-guide(v-else-if="propertyItem=='target'")
  summary
  .molle-guide__body.caption
    p リンクの表示先ウィンドウの指定方法です。
      | 例えば、_blankを選択した場合、新しいウィンドウまたはタブを開いてリンク先を表示します。
      | （新しいウィンドウになるか、新しいタブになるかは、使用しているブラウザに依存して変わります。）

details.molle-guide(v-else-if="propertyItem=='baseColumn'")
  summary
  .molle-guide__body.caption
    p 横幅を12分割した時の割合で子要素のカラム幅(column)を指定します。

details.molle-guide(v-else-if="propertyItem=='Column'")
  summary
  .molle-guide__body.caption
    p 横幅を12分割した時の割合で当該要素のカラム幅(column)を指定します。

details.molle-guide(v-else-if="propertyItem=='html'")
  summary
  .molle-guide__body.caption
    p htmlコードを直書きします。（例えばYouTube動画の埋め込みなどに利用できます。）

details.molle-guide(v-else-if="propertyItem=='html'")
  summary
  .molle-guide__body.caption
    p htmlコードを直書きします。（例えばYouTube動画の埋め込みなどに利用できます。）

details.molle-guide(v-else-if="propertyItem=='isViewTheme'")
  summary
  .molle-guide__body.caption
    p 適用するアニメーションを{{$words.theme}}から選択します。

details.molle-guide(v-else-if="propertyItem=='alt'")
  summary
  .molle-guide__body.caption
    p 画像が表示できない時に、画像の代わりに表示されるテキストを指定します。

details.molle-guide(v-else-if="propertyItem=='csv'")
  summary
  .molle-guide__body.caption
    p 表の内容をCSV形式で入力します。
    p 表のセル内で改行する時は、改行箇所に"&lt;br&gt;"と書いてください。
      | （例：aaaaa&lt;br&gt;bbbbb）

details.molle-guide(v-else-if="propertyItem=='card'")
  summary
  .molle-guide__body.caption
    p PictureモジュールとParagraphモジュール２つをグループ化したモジュールです。

details.molle-guide(v-else-if="propertyItem=='gfUrl'")
  summary
  .molle-guide__body.caption
    p GoogleFromのプレビューページのURLを入力します。

details.molle-guide(v-else-if="propertyItem=='gmLat'")
  summary
  .molle-guide__body.caption
    p {{$words.lat}}と{{$words.lng}}を入力すると、その地点のGoogleMapが表示されます。

details.molle-guide(v-else-if="propertyItem=='gmTitle'")
  summary
  .molle-guide__body.caption
    p 入力すると{{$words.marker}}に{{$words.title}}がつきます。

details.molle-guide(v-else-if="propertyItem=='gmText'")
  summary
  .molle-guide__body.caption
    p 入力すると{{$words.marker}}に{{$words.text}}がつきます。


</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class MolleGuide extends Vue {
  @Prop() propertyItem!: string;

}
</script>

<style lang="scss">
.style-comp {
}
</style>
