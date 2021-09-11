import {Vue} from "nuxt-property-decorator";

Vue.prototype.$lang = "jp";

Vue.prototype.$words = {
  add: {jp: "追加", en: "Add"},
  delete: {jp: "削除", en: "Delete"},
  path: {jp: "Path", en: "Path"},
  readme: {jp: "備考", en: "Readme"},
  universal: {jp: "汎用", en: "Universal"},
  bg: {jp: "背景画像", en: "Background"},
  sp: {jp: "スマホ", en: "sp"},
  url: {jp: "URL", en: "URL"},
  col: {jp: "カラム幅", en: "Column Size"},
  settings: {jp: "設定", en: "Settings"},
  lat: {jp: "緯度", en: "lat"},
  lng: {jp: "経度", en: "lng"},
  marker: {jp: "マーカー", en: "marker"},
  complete: {jp: "完了", en: "Complete"},
  explorer: {jp: "エクスプローラー", en: "Explorer"},
  upload: {jp: "アップロード", en: "Upload"},
  sub: {jp: "サブ", en: "sub"},
  text: {jp: "テキスト", en: "Text"},
  more: {jp: "もっと見る", en: "more"},
  news: {jp: "ニュース", en: "News"},
  root: {jp: "基底アイテムデータ", en: "Root Item"},
  page: {jp: "ページ", en: "Page"},
  structure: {jp: "構造", en: "Structure"},
  class: {jp: "クラス", en: "class"},
  id: {jp: "ID", en: "ID"},
  name: {jp: "名前", en: "name"},
  dataClean: {jp: "未使用データ削除", en: "Data Clean"},
  export: {jp: "データ出力", en: "Export"},
  import: {jp: "読み込み", en: "Import"},
  login: {jp: "ログイン", en: "Login"},
  logout: {jp: "ログアウト", en: "Logout"},
  mail: {jp: "メールアドレス", en: "mail"},
  password: {jp: "パスワード", en: "password"},
  description: {jp: "説明文", en: "Description"},
  display: {jp: "表示用", en: "Display"},
  itemId: {jp: "アイテムID", en: "itemId"},
  ogp: {jp: "OGP", en: "OGP"},
  alt: {jp: "代替テキスト", en: "alt"},
  src: {jp: "画像URL", en: "src"},
  center: {jp: "中央寄せ", en: "center"},
  color: {jp: "色", en: "Color"},
  container: {jp: "container", en: "container"},
  fluid: {jp: "fluid", en: "fluid"},
  left: {jp: "左寄せ", en: "left"},
  right: {jp: "右寄せ", en: "right"},
  theme: {jp: "テーマ", en: "Theme"},
  csv: {jp: "CSV", en: "CSV"},
  editer: {jp: "Editer", en: "Editer"},
  source: {jp: "Source", en: "Source"},
  title: {jp: "タイトル", en: "Title"},
  section: {jp: "セクション", en: "section"},
  meta: {jp: "メタ", en: "Meta"},
  save: {jp: "保存", en: "Save"},
  edit: {jp: "編集", en: "Edit"},
  preview: {jp: "プレビュー", en: "Preview"},
  list: {jp: "一覧", en: "List"},
  image: {jp: "画像", en: "Image"},
};

for (let id in Vue.prototype.$words) {
  //@ts-ignore
  Vue.prototype.$words[id] = Vue.prototype.$words[id][Vue.prototype.$lang];
}
