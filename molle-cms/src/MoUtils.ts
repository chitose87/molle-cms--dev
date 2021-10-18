import {Component, Vue, Prop} from "nuxt-property-decorator";
import {IItemData, ILogsData, IPageData} from "./interface";
import {Singleton} from "./Singleton";
import firebase from "firebase";

/**
 * Molle関連機能のユーティリティクラス
 */
export class MoUtils {
  static get ls() {
    if (!this._ls) {
      this._ls = JSON.parse(localStorage.getItem("molle") || "{}");
      if (!this._ls.history) this._ls.history = [];
    }
    return this._ls;
  }

  private static _ls: {
    history: {
      cmd: string,
      id: string,
      before: any,
      data: any
    }[],
    currentHistory: 0
  };

  /**
   * module名から初期データでインスタンスを作成する
   * @param itemId
   */
  static createItemData(itemId: string) {
    let data: IItemData = Object.assign({}, Vue.prototype.$molleModules[itemId].def);

    switch (data.type) {
      case "children":
      case "group":
        let value = JSON.parse(JSON.stringify(data.value));
        // デフォルト子要素作成
        for (let i in value) {
          let node = value[i];
          if (node.id == "{uid}") {
            node.id = Singleton.itemsRef.doc().id;
          }
        }
        data.value = value;
        break;
    }
    return data;
  }

  /**
   * ItemDataを取得
   * @param id
   * @param update
   */
  static updateItem(id: string, update: any, isSet = false) {
    let promise;
    let historyItem: any = {
      timestamp: firebase.firestore.Timestamp.now(),
      uid: firebase.auth().currentUser!.uid,
    };
    let logRef = Singleton.logsRef.doc(id);

    //
    if (isSet) {
      let batch = firebase.firestore().batch();
      batch.set(Singleton.itemsRef.doc(id), update);
      batch.set(logRef, {history: [historyItem]});
      promise = batch.commit();
    } else {
      promise = Singleton.itemsRef.doc(id).update({...update});
      //log
      logRef.get()
        .then((snap: firebase.firestore.DocumentSnapshot) => {
          let data = snap.data() || {};
          let history: ILogsData[] = data.history || [];
          historyItem.update = update;
          history.unshift(historyItem);
          //todo 短時間で同一idに対して変更があったものを統合
          if (history.length > 100) history.length = 100;
          if (snap.exists) {
            logRef.update({history: history});
          } else {
            logRef.set({history: history});
          }
        });
    }

    return promise;
  }

  /**
   * undo/redo用
   * @param cmd
   * @param id
   * @param before
   * @param update
   */
  static addHistory(cmd: string, id: string, before: any, update: any) {
    let lsData = {
      cmd: cmd,
      id: id,
      before: Object.assign({}, before),
      data: Object.assign({}, update),
    };

    delete lsData.before.createTime;
    delete lsData.before.updateTime;
    delete lsData.data.createTime;
    delete lsData.data.updateTime;

    if (this.ls.currentHistory) {
      this.ls.history = this.ls.history.splice(this.ls.currentHistory);
    }
    this.ls.history.unshift(lsData);
    if (this.ls.history.length > 20) this.ls.history.length = 20;
    this.ls.currentHistory = 0;
    localStorage.setItem("molle", JSON.stringify(this.ls));
    // console.log(this.ls)
  }

  // undo
  static undoHistory(ctx: any) {
    let history = this.ls.history[this.ls.currentHistory];
    if (!history) return;
    switch (history.cmd) {
      case "create":
      case "update":
      case "delete":
        this.updateItem(
          history.id,
          history.before,
          false,
        );
        break;
    }

    ctx.$router.push({query: {...ctx.$route.query, focus: history.id}});
    this.ls.currentHistory++;
    localStorage.setItem("molle", JSON.stringify(this.ls));
  }

  //redo
  static redoHistory(ctx: any) {
    let history = this.ls.history[this.ls.currentHistory - 1];
    if (!history) return;
    switch (history.cmd) {
      case "create":
      case "update":
      case "delete":
        this.updateItem(
          history.id,
          Object.assign({}, history.before, history.data),
          false,
        );
        break;
    }
    ctx.$router.push({query: {...ctx.$route.query, focus: history.id}});
    this.ls.currentHistory--;
    localStorage.setItem("molle", JSON.stringify(this.ls));
  }

  /**
   * 複数保存処理
   */
  static updateBatch(arr: {cmd: string, ref: any, data: any}[]) {
    let batch = firebase.firestore().batch();
    let promiseList = [];

    for (let i = 0; i < arr.length; i++) {
      let que = arr[i];
      switch (que.cmd) {
        case "set":
          batch.set(que.ref, que.data);
          break;
        case "update":
          batch.update(que.ref, que.data);
          break;
        case "delete":
          batch.delete(que.ref);
          break;
      }
      if ((i + 1) % 500 == 0) {
        promiseList.push(batch.commit());
        batch = firebase.firestore().batch();
      }
    }
    promiseList.push(batch.commit());
    return Promise.all(promiseList);
  }
}
