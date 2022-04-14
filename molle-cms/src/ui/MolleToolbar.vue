<template lang="pug">
.molle-tool-bar
  //ログイン済み
  .mb-2
    button.btn.btn-primary(type="button", @click="checkCI")
      span {{$words.release}} {{$words.settings}}

    .modal(v-if="deployModal")
      .modal__fiexd
        .modal__close(@click="deployModal=false")
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
    button.btn.btn-info.btn-block(type="button" @click="onExport")
      span {{$words.export}}
  .mb-2
    button.btn.btn-warning.btn-block(type="submit" @click="importModal=true")
      span {{$words.import}}
    .modal(v-if="importModal")
      .modal__fiexd
        .modal__close(@click="importModal=false")
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
    button.btn.btn-danger.btn-block(@click="cleanup")
      span {{$words.dataClean}}
  .mb-2
    button.btn.btn-danger.btn-block(@click="cleanupStorage")
      span Cleanup Storage
  .mb-2
    button.btn.btn-info.btn-block(type="button" @click="onLogout")
      span {{$words.logout}}

    UserSettings
    // ユーザー設定


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
import UserSettings from "./UserSettings.vue";

@Component({
  components: {UserSettings},
})
export default class MolleToolbar extends Vue {
  importModal: boolean = false;
  deployModal: boolean = false;
  currentCIFlow: any = {};
  schedule = {
    min: "",
    date: "",
    active: false,
  };
  cleanupStr = "";

  onLogout() {
    firebase.auth().signOut();
  }

  // デプロイチェック
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
    console.log("cleanup");
    let batchQue: any = [];

    Promise.all([
      Singleton.pagesRef.get(),
      Singleton.itemsRef.get(),
      Singleton.logsRef.get(),
    ]).then(([pages, items, logs]) => {
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
      let logAll: any = {};
      logs.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        let data: any = _snap.data();
        if (!data.id || !obj[data.id]) {
          batchQue.push({
            cmd: "delete",
            ref: Singleton.logsRef.doc(_snap.id),
          });
        } else {
          if (!logAll[data.id]) logAll[data.id] = [];
          data.refId = _snap.id;
          logAll[data.id].push(data);
        }
      });

      // logの結合　(=LogPropertyComp.vue
      for (let key in logAll) {
        let list = logAll[key];
        //sort 降順
        list.sort((a: any, b: any) => {
          return a.timestamp < b.timestamp ? 1 : -1;
        });
        let before = list[0];
        let host: any;
        for (let i = 1; i < list.length; i++) {
          let log = list[i];

          if (before.uid == log.uid && before.timestamp - log.timestamp < 10
            || i > 100) {
            // 同じユーザーが10秒以内に変更したもの or 100件以上

            // 統合
            if (i < 100) {
              if (!host) host = before;
              host.data = Object.assign(log.data, host.data);
            }
            // listから削除して、logを消す
            list.splice(i, 1);
            batchQue.push({
              cmd: "delete",
              ref: Singleton.logsRef.doc(log.refId),
            });
            i--;
          } else if (host) {
            // 別のユーザーに切り替わる or 10秒以上間がある host更新
            batchQue.push({
              cmd: "update",
              ref: Singleton.logsRef.doc(host.refId),
              data: {data: host.data},
            });
            host = null;
          }

          before = log;
        }
      }
      console.log(batchQue.length);
      if (batchQue.length) {
        MoUtils.updateBatch(batchQue).then(() => {
          alert("完了しました。結果はconsoleを確認してください");
        });
      } else {
        alert("未参照のitemはありませんでした。");
      }
    });
  }

  /**
   *
   */
  cleanupStorage() {
    Promise.all([
      Singleton.pagesRef.get(),
      Singleton.itemsRef.get(),
      firebase.storage().ref().child(`${process.env.molleProjectID}`).listAll(),
    ]).then(([pages, items, storage]) => {
      let arr: any = [];
      items.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        arr.push(_snap.data());
      });
      pages.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
        arr.push(_snap.data());
      });

      let str = JSON.stringify({data: arr});
      let deleteList: string[] = [];
      storage.items.forEach((itemRef: firebase.storage.Reference) => {
        if (!str.includes(itemRef.fullPath)) {
          deleteList.push(itemRef.fullPath);
          console.log("------" + itemRef.fullPath);
        }
      });
      if ("削除します。\r\n" + confirm(deleteList.join("\r\n"))) {
        storage.items.forEach((itemRef: firebase.storage.Reference) => {
          if (!str.includes(itemRef.fullPath)) {
            itemRef.delete();
          }
        });
      }
    });
  }
}
</script>

<style lang="scss">
.molle-tool-bar {
}
</style>
