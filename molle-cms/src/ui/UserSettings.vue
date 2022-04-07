<template lang="pug">
div
  div(v-if="data.thumbnail")
    img(:src="data.thumbnail" width="144px" height="144px" alt="data.name||user.email")
  b-icon(v-else icon="person-fill")
  p.btn.btn-link(@click="isShow=true")
    span(v-html="data.name||user.email")
  //
  .modal(v-if="isShow")
    .modal__fiexd
      .modal__close(@click="cancel")
      .modal__body
        p
          label.w-100 Name :
            input.form-control.form-control-lg(
              type="text"
              v-model="data.name"
            )

        //
        p
          label.w-100 Thumbnail :
            input.form-control.form-control-lg(
              type="text"
              v-model="data.thumbnail"
              placeholder="https://"
            )
        p.caption(v-html="user.email")
        p.caption(v-html="user.uid")

        button.btn.btn-primary.btn-block(@click="save")
          span Save

</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop, Emit,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "../Singleton";
import {IItemData, ILogsData, IPageData} from "../interface";
import {MoUtils} from "../MoUtils";

@Component({
  components: {},
})
export default class UserSettings extends Vue {
  usersRef = firebase.firestore().collection(`_users/`);

  isShow: boolean = false;
  user = {
    uid: firebase.auth().currentUser!.uid,
    email: firebase.auth().currentUser!.email,
  };
  before: any = {};
  data = {
    name: "",
    thumbnail: "",
  };

  mounted() {
    this.usersRef.doc(firebase.auth().currentUser!.uid)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) {
          this.before = {
            name: this.user.email!.match(/(.*)(?=@)/)![1],
          };
          this.usersRef.doc(firebase.auth().currentUser!.uid).set(this.before);
          return;
        }
        this.before = snap.data();
        this.$set(this, "data", this.before);
      });
  }

  save() {
    this.usersRef.doc(firebase.auth().currentUser!.uid).update(this.data);
    this.before = this.data;
    this.isShow = false;
  }

  cancel() {
    this.$set(this, "data", this.before || {});
    this.isShow = false;
  }
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
