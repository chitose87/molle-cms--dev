<template lang="pug">
.molle-tool-bar
  div(v-if="!localValue")
    form.form-group(@submit.prevent, @submit="onLogin")
      label mail:
        input.form-control.form-control-sm(type="email" name="email")
      label password:
        input.form-control.form-control-sm(type="password" name="password")
      button.btn.btn-info(type="submit")
        span Login
  div(v-else)
    .form-inline
      button.btn.btn-info(type="button" @click="onLogout")
        span Logout

      .mr-2.ml-auto
        button.btn.btn-warning(type="button", @click="checkCI")
          span 公開

        .modal(v-if="deployModal" :aria-expanded="deployModal")
          .modal__fiexd
            .modal__close(@click="deployModal=!deployModal")
            .modal__body
              p(v-html="currentCIFlow.name")
              p(v-html="currentCIFlow.status")
              p(v-html="currentCIFlow.conclusion")
              p(v-html="currentCIFlow.created_at")
              button.btn.btn-warning(type="button", @click="deployQue")
                span() 公開
              p.caption
                | 5~10分程度かかります。
                br
                | 1日あたり100分を超えると料金が発生します。
              hr
              .form-inline
                input.form-control.mr-2(type="date" v-model="schedule.date" @change="scheduleUpdate")
                label.btn.btn-outline-primary
                  span.mr-2 予約
                  input(type="checkbox" v-model="schedule.active" @change="scheduleUpdate")

      span.mr-2 |
      .mr-2
        button.btn.btn-info(type="button" @click="onExport")
          span Export
      .mr-2
        button.btn.btn-warning(type="submit" @click="importModal=true")
          span Import
        .modal(v-if="importModal" :aria-expanded="importModal")
          .modal__fiexd
            .modal__close(@click="importModal=!importModal")
            .modal__body
              form(@submit.prevent, @submit="onImport")
                input(
                  type="file",
                  name="files",
                  accept="application/json",
                  multiple
                )
                button.btn.btn-info(type="submit")
                  span Import
      span.mr-2 |
      .mr-2
        button.btn.btn-danger(@click="cleanup")
          span Data Clean
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop, Emit,
} from "~/node_modules/nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "~/molle/Singleton";
import {IItemData, IPageData} from "~/molle/interface";

@Component({
  components: {},
})
export default class MolleToolbar extends Vue {
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

  importModal: boolean = false;
  deployModal: boolean = false;
  currentCIFlow: any = {};
  schedule = {
    min: "",
    date: "",
    active: false
  }


  onLogin(e: any) {
    firebase.auth()
      .signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
      .then((user) => {
        if (user) {
          this.localValue = true;
        }
      })
  }

  onLogout() {
    firebase.auth().signOut();
    this.localValue = false;
  }

  checkCI() {
    this.deployModal = true;
    fetch(`${process.env.functions}/molle_ghStatus`)
      .then((res: any) => {
        return (res.json());
      })
      .then((str: string) => {
        let json = JSON.parse(str);
        console.log(json);
        this.$set(this, "currentCIFlow", json.workflow_runs[0]);
      });

    //
    Singleton.systemDocRef
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        let data: any = snap.data();
        this.$set(this.schedule, "date", data.deploySchedule);
        this.$set(this.schedule, "active", data.deployScheduleActive);
      })
  }

  scheduleUpdate() {
    Singleton.systemDocRef.update({
      deploySchedule: this.schedule.date,
      deployScheduleActive: this.schedule.active,
    });
  }

  deployQue() {
    this.deployModal = false;
    Singleton.systemDocRef.update({
      deployQue: true
    });
  }

  /**
   *
   */
  onExport() {
    Singleton.pagesRef.onSnapshot(
      (snap: firebase.firestore.QuerySnapshot) => {
        let obj: any = {pages: {}};
        snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
          obj.pages[_snap.id] = _snap.data();
        });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(
          new Blob(
            [JSON.stringify(obj)],
            {type: "text/plain"},
          ),
        );
        a.download = `pages-${new Date().toUTCString()}.json`;
        a.click();
      },
    );

    // items
    Singleton.itemsRef.get().then((snap: firebase.firestore.QuerySnapshot) => {
      let obj: any = {items: {}};
      snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        obj.items[_snap.id] = itemData;
      });
      let a = document.createElement("a");
      a.href = URL.createObjectURL(
        new Blob(
          [JSON.stringify(obj)],
          {type: "application/json"}),
      );
      a.download = `items-${new Date().toUTCString()}.json`;
      a.click();
    });
  }

  /**
   *
   * @param e
   */
  onImport(e: Event) {
    let target = <HTMLFormElement>e.target;
    let files: FileList = target.files.files;

    if (files.length == 0) {
      alert("ファイルが選択されていません。");
      return;
    }

    if (
      !window.confirm(`
この作業は破壊的な変更です。
同一のIDの場合、既存のデータがすべて上書きされます。
重複するjsonデータを読み込む場合、優先順位に規則性はありません。
よろしいですか？`)
    )
      return;

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          let data = JSON.parse(e.target.result);
          let batch = firebase.firestore().batch();
          if (data.pages) {
            for (let id in data.pages) {
              batch.set(Singleton.pagesRef.doc(id), data.pages[id]);
            }
          } else if (data.items) {
            for (let id in data.items) {
              batch.set(Singleton.itemsRef.doc(id), data.items[id]);
            }
          } else {
            throw new Error("pagesかitemsがありませんでした。");
          }
          batch.commit().then(() => {
            alert("importが完了しました");
          });
        } catch (e) {
          alert(e);
        }
      };
      reader.readAsText(files[i]);
    }
  }

  /**
   *
   */
  cleanup() {
    console.log("cleanup");
    let batch = firebase.firestore().batch();

    Promise.all([
      Singleton.pagesRef.get(),
      Singleton.itemsRef.get()
    ]).then((v: any) => {
      let obj: any = {};
      v[1].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        obj[_snap.id] = 0;
      });
      v[1].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let itemData = <IItemData>_snap.data();
        let flag = false;
        //@ts-ignore
        if (itemData.type == "children") {
          for (let i in itemData.value) {
            let item = itemData.value[i];
            obj[item.id || item] += 1;
            // todo 参照されてるリストを作る
            if (typeof item == "string") {
              // node化
              itemData.value[i] = {id: item};
              flag = true;
            }
          }
          if (flag) {
            batch.update(Singleton.itemsRef.doc(_snap.id), "value", itemData.value)
          }
        }
      });
      v[0].forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let pageData = <IPageData>_snap.data();
        //@ts-ignore
        obj[pageData.itemId] += 1;
      });

      //誰からも未参照のitemを削除
      console.log(obj)
      for (let id in obj) {
        if (obj[id] == 0) {
          console.log("delete", id);
          batch.delete(Singleton.itemsRef.doc(id));
        }
      }
      batch.commit();
    })
  }
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
