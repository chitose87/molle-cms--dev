<template lang="pug">
div(v-if="!value && !isLogin && ready")
  .modal(:aria-expanded="!!$route.query.id")
    .modal__fiexd
      .modal__close
      .modal__body.bootstrap
        form.form-group(@submit.prevent @submit="onLogin")
          p
            label.w-100 {{$words.mail}}:
              input.form-control.form-control-lg(type="email" name="email" v-model="user.email")
          p
            label.w-100 {{$words.password}}:
              input.form-control.form-control-lg(type="password" name="password" v-model="user.pw")
          p
            button.btn.btn-info.btn-block(type="submit")
              span {{$words.login}}
          button.btn.btn-link.btn-sm(@click="sendPasswordResetEmail")
            b-icon(icon="envelope")
            span {{$words.password}} {{$words.resetting}}

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
export default class MolleBase extends Vue {
  @Prop() public value!: any;

  @Emit()
  public input(value: any) {
  }

  protected get localValue(): any {
    return this.value;
  }

  protected set localValue(value: any) {
    this.input(value);
  }

  ready = false;
  isLogin = false;
  user = {
    email: "",
    pw: "",
  };

  mounted() {
    Singleton.firebaseInit((user: any) => {
      this.ready = true;
      this.localValue = this.isLogin = !!user;
    });
  }

  onLogin(e: any) {
    firebase.auth()
      .signInWithEmailAndPassword(this.user.email, this.user.pw)
      .then((user) => {
        if (user) {
          this.localValue = this.isLogin = true;
        }
      });
  }

  /**
   *
   */
  sendPasswordResetEmail() {
    firebase.auth().sendPasswordResetEmail(this.user.email)
      .then((result) => {
        alert(`パスワード再設定メールをリクエストしました。メールをご確認ください`);
      })
      .catch((error) => {
        alert(error + "/" + this.user.email);
      });
  }
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
