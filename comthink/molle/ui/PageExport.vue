<template lang="pug">
button.btn.btn-info.mx-2(
  type="button",
  @click="onExport"
) Export

</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop, Emit,
} from "nuxt-property-decorator";
import firebase from "firebase";
import {Singleton} from "~/molle/Singleton";
import {IItemData, ILogsData, IPageData} from "~/molle/interface";

@Component({
  components: {},
})
export default class PageExport extends Vue {
  @Prop() public value!: any;
  @Prop() pageId!: any;

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

  user = {
    email: ""
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
    Singleton.pagesRef.doc(this.pageId)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
          let obj: any = {pages: {}};
          obj.pages[this.pageId] = snap.data();
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
    ) return;

    let arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            let data = JSON.parse(e.target.result);
            let _arr = [];
            let batch = firebase.firestore().batch();
            let batchCount = 0;
            let items = data.pages || data.items;
            let ref: any = data.pages ? Singleton.pagesRef
              : data.items ? Singleton.itemsRef
                : reject();
            for (let id in items) {
              batch.set(ref.doc(id), items[id]);
              if (++batchCount >= 500) {
                _arr.push(batch.commit());
                batch = firebase.firestore().batch();
                batchCount = 0;
              }
            }
            _arr.push(batch.commit());
            Promise.all(_arr).then(resolve);
          } catch (e) {
            alert(e);
            reject();
          }
        };
        reader.readAsText(files[i]);
      }));
    }

    Promise.all(arr).then(() => {
      alert("complete")
    });
  }

  /**
   *
   */
  cleanup() {
    console.log("cleanup");

    let batch = firebase.firestore().batch();
    let batchCount = 0;

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
            batch.update(Singleton.itemsRef.doc(_snap.id), "value", itemData.value);
            if (++batchCount >= 500) {
              batch.commit();
              batch = firebase.firestore().batch();
              batchCount = 0;
            }
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
          if (++batchCount >= 500) {
            batch.commit();
            batch = firebase.firestore().batch();
            batchCount = 0;
          }
        }
      }
      batch.commit();
      alert("完了しました。結果はconsoleを確認してください")
    })
  }

  /**
   *
   */
  sendPasswordResetEmail() {
    firebase.auth().sendPasswordResetEmail(this.user.email)
      .then((result) => {
        alert(`パスワード再設定メールをリクエストしました。メールをご確認ください`)
      })
      .catch((error) => {
        alert(error + "/" + this.user.email)
      });
  }
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
