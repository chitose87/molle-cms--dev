<template lang="pug">
.project-settings-comp
  h2.p-3.mt-0.mb-4.text-white.bg-success(@click="flag=!flag")
    b-icon.mr-2(icon="tools")
    | {{$words.project}} {{$words.settings}}
    b-icon(:icon="flag?'chevron-up':'chevron-down'")

  div(v-if="flag")
    div
      span(v-html="uid")
      input.form-control.form-control-sm(
        type="text"
        v-model="selfUserData.name"
        @change="()=>{onChangeUserName()}"
      )

    h4.mb-2 ADDED/追加された機能
    ul
      li 自動デプロイ機能 new!
      li 未使用モジュールの一括削除
      li 管理画面のデザイン変更

    h4.mb-2 READY/追加可能機能

    h4.mb-2 TODO
    ul
      li 変更ログ・アンドゥ
      li モジュール入れ替え(loop注意)
      li 継承・拡張
      li itemData内に使用されているmodule-idを管理
      li データ連携モジュール
      li カスタムセット登録
      li firebaseに上げた画像をdeploy時にhostingサーバーに移動させるOption
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {Singleton} from "../Singleton";
import firebase from "firebase";
import {MoUtils} from "../MoUtils";

@Component({
  components: {},
})
export default class ProjectSettingsComp extends Vue {
  flag = false;
  inited = false;

  users: {[key: string]: {name: string}} = {};
  uid: string = firebase.auth().currentUser!.uid;
  selfUserData = {
    name: "",
  };

  @Watch("flag")
  onOpen() {
    if (!this.inited) {
      this.inited = true;
      firebase.firestore().doc("_settings/options")
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          console.log(snap.data());
        });

      Singleton.getUsers((users: any) => {
        this.$set(this, "users", users);
        this.$set(this, "selfUserData", users[this.uid] || {});
      });
    }
  }

  onChangeUserName() {
    let update: any = {};
    update[this.uid] = this.selfUserData;
    firebase.firestore().doc("_settings/users")
      .update(update);
  }
}
</script>

<style lang="scss">
.project-settings-comp {
}
</style>
