<template lang="pug">
.molle-tool-bar
  div(v-if="!localValue")
    // 未ログイン
    form.form-group(@submit.prevent, @submit="onLogin")
      label {{$words.mail}}:
        input.form-control.form-control-sm(type="email" name="email" v-model="user.email")
      label {{$words.password}}:
        input.form-control.form-control-sm(type="password" name="password")
      button.btn.btn-info(type="submit")
        span {{$words.login}}
      button.btn.btn-link.btn-sm(@click="sendPasswordResetEmail")
        b-icon(icon="envelope")
        span {{$words.password}} {{$words.resetting}}

  div(v-else)
    //ログイン済み
    .mb-2
      button.btn.btn-primary(type="button", @click="checkCI")
        span {{$words.release}} {{$words.settings}}

      .modal(v-if="deployModal" :aria-expanded="deployModal")
        .modal__fiexd
          .modal__close(@click="deployModal=!deployModal")
          .modal__body

            button.btn.btn-warning(type="button", @click="deployQue")
              span() {{$words.immediate}} {{$words.execution}}
            p.caption
              | 5~10分程度かかります。
              br
              | 1日あたり100分を超えると料金が発生します。

            hr
            .form-inline
              input.form-control.mr-2(type="date" v-model="schedule.date" @change="scheduleUpdate")
              label.btn.btn-outline-primary
                span.mr-2 {{$words.reserve}}
                input(type="checkbox" v-model="schedule.active" @change="scheduleUpdate")
            p.caption *指定日の朝9時頃に実行されます。

            hr
            h4 Github {{$words.actions}} {{$words.status}}.
            div(v-if="currentCIFlow.reading")
              p {{$words.checking}}…
            div(v-else)
              p
                span {{$words.task}}：
                span(v-html="currentCIFlow.name")
              p
                span {{$words.status}}：
                span(v-html="currentCIFlow.status")
              p
                span {{$words.conclusion}}：
                span(v-html="currentCIFlow.conclusion")
              p
                span {{$words.date}}：
                span(v-html="currentCIFlow.created_at")
    hr
    .mb-2
      button.btn.btn-info(type="button" @click="onExport")
        span {{$words.export}}
    .mb-2
      button.btn.btn-warning(type="submit" @click="importModal=true")
        span {{$words.import}}
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
                span {{$words.import}}
    hr
    .mb-2
      button.btn.btn-danger(@click="cleanup")
        span {{$words.dataClean}}
    .mb-2
      button.btn.btn-info(type="button" @click="onLogout")
        span {{$words.logout}}

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
    active: false,
  };

  user = {
    email: "",
  };


  onLogin(e: any) {
    firebase.auth()
      .signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
      .then((user) => {
        if (user) {
          this.localValue = true;
        }
      });
  }

  onLogout() {
    firebase.auth().signOut();
    this.localValue = false;
  }

  checkCI() {
    this.deployModal = true;
    this.$set(this, "currentCIFlow", {reading: true});

    fetch(`${process.env.functions}/${process.env.molleProjectID}_ghStatus`)
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
      });
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
      deployQue: true,
    });
  }

  /**
   *
   */
  onExport() {
    Singleton.pagesRef.get().then((snap: firebase.firestore.QuerySnapshot) => {
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
        a.download = `${process.env.molleProjectID}-${process.env.molleBrunch}-pages-${new Date().toUTCString()}.json`;
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
      a.download = `${process.env.molleProjectID}-${process.env.molleBrunch}-items-${new Date().toUTCString()}.json`;
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
    ) return;

    let batchQue: any = [];
    let promiseList = [];

    for (let i = 0; i < files.length; i++) {
      promiseList.push(new Promise<void>((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            let data = JSON.parse(e.target.result);
            let items = data.pages || data.items;
            let ref: any = data.pages ? Singleton.pagesRef
              : data.items ? Singleton.itemsRef
                : new Error();

            for (let id in items) {
              batchQue.push({
                cmd: "set",
                ref: ref.doc(id),
                data: items[id],
              });
            }
            resolve();
          } catch (e) {
            alert(e);
          }
        };
        reader.readAsText(files[i]);
      }));
    }
    Promise.all(promiseList)
      .then(() => {
        console.log(batchQue.length);
        MoUtils.updateBatch(batchQue).then(() => {
          alert("complete");
        });
      });
  }

  /**
   *
   */
  cleanup() {
    // todo storageの削除

    console.log("cleanup");
    let batchQue: any = [];

    Promise.all([
      Singleton.pagesRef.get(),
      Singleton.itemsRef.get(),
      Singleton.logsRef.get(),
      firebase.storage().ref().child(`${process.env.molleProjectID}`).listAll()
    ]).then(([pages, items, logs, storage]) => {
      let obj: any = {};
      let pagesData: any = {};
      // カウントリセット
      items.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        obj[_snap.id] = _snap.data();
        obj[_snap.id]._count = 0;
      });
      for (let id in obj) {
        let itemData = <IItemData>obj[id];
        let flag = false;
        if (itemData.type == "children" || itemData.type == "group") {
          // childに対してカウントアップ
          for (let i in itemData.value) {
            let item = itemData.value[i];
            let _id = item.id || item;
            obj[_id] && (obj[_id]._count += 1);
            // todo 参照されてるリストを作る
            if (typeof item == "string") {
              // node化
              itemData.value[i] = {id: item};
              flag = true;
            }
          }
          if (flag) {
            batchQue.push({
              cmd: "update",
              ref: Singleton.itemsRef.doc(id),
              data: {value: itemData.value},
            });
          }
        }
      }

      // itemIdに対してカウントアップ
      pages.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let pageData = <IPageData>_snap.data();
        pagesData[_snap.id] = pageData;
        obj[pageData.itemId!] && (obj[pageData.itemId!]._count += 1);
      });

      //誰からも未参照のitemを削除
      console.log(Object.keys(obj).length);
      let flag = true;
      while (flag) {
        flag = false;
        for (let id in obj) {
          let itemData = obj[id];
          if (!itemData._count) {
            console.log("delete", id);
            // childに対してカウントダウン
            if (itemData.type == "children" || itemData.type == "group") {
              for (let i in itemData.value) {
                let item = itemData.value[i];
                let _id = item.id || item;
                obj[_id] && (obj[_id]._count -= 1);
              }
            }
            batchQue.push({
              cmd: "delete",
              ref: Singleton.itemsRef.doc(id),
            });
            delete obj[id];
            flag = true;
          }
        }
      }
      // logの削除
      logs.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        if (!obj[_snap.id]) {
          batchQue.push({
            cmd: "delete",
            ref: Singleton.logsRef.doc(_snap.id),
          });
        }
      });
      console.log(batchQue.length);
      if (batchQue.length) {
        MoUtils.updateBatch(batchQue).then(() => {
          alert("完了しました。結果はconsoleを確認してください");
        });
      } else {
        alert("未参照のitemはありませんでした。");
      }

      //
      let str = JSON.stringify(obj) + JSON.stringify(pagesData);
      storage.items.forEach((itemRef: firebase.storage.Reference) => {
        // itemRef.getDownloadURL()
        if (!str.includes(itemRef.fullPath)) {
          itemRef.delete();
          console.log("------" + itemRef.fullPath)
        } else {
          // console.log(itemRef.fullPath)
        }
      });
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
