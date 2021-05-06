# MOLLE CMS v0

## 公開環境　(public)
https://e-and-buy-public.web.app/
## 管理画面環境 (public-cms)
https://e-and-buy-cms.web.app/

## セッティング
npm i
firebase init

## 開発
npm run dev
isDev / SPA mode
## ビルド

### 静的環境
npm run gen
isDev=false / static mode
not --molle ディレクトリ

### 管理画面
npm run gen:cms
isDev=false / SPA

### 動作確認
firebase serve

## デプロイ

### 静的環境
npm run hosting:public

### 管理画面
npm run hosting:cms

### 両方
npm run hosting

### プラグイン


## 画像について
### Google Storageを使う場合
https://console.cloud.google.com/storage/browser/
にて、
{{project name}}.appspot.com　に　allUsers　を追加する。
・Storage レガシー バケット読み取り
・Storage オブジェクト閲覧者
を付与

＊誰からでもアクセスできる状態になるので注意

## user
