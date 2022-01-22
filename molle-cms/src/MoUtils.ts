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
      if (!this._ls.copyItem) this._ls.copyItem = {};
    }
    return this._ls;
  }

  static lsSave() {
    localStorage.setItem("molle", JSON.stringify(this.ls));
  }

  private static _ls: {
    history: {
      cmd: string,
      id: string,
      before: any,
      data: any
    }[],
    copyItem: {
      id?: string,
      key?: string
    },
    currentHistory: 0
  };

  /**
   * module名から初期データでインスタンスを作成する
   * @param itemId
   */
  static createItemData(itemId: string, opt?: {enabled: string[]}) {
    let data: IItemData = Object.assign({}, Vue.prototype.$molleModules[itemId].def);
    if (opt) {
      data.dev = opt;
      // 使えるモジュールが限定されている場合
      if (data.type == "children" && opt.enabled) {
        data.value = [{
          id: Singleton.itemsRef.doc().id,
          fixedModuleId: opt.enabled[0],
        }];
        return data;
      }
    }

    // デフォルト子要素作成
    switch (data.type) {
      case "children":
      case "group":
        let value = JSON.parse(JSON.stringify(data.value));
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
    let batchQue: any = [
      {
        cmd: isSet ? "set" : "update",
        ref: Singleton.itemsRef.doc(id),
        data: {...update},
      },
      {
        cmd: "set",
        ref: Singleton.logsRef.doc(new Date().getTime() + "-" + Math.floor(Math.random() * 1000)),
        data: {
          id: id,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: firebase.auth().currentUser!.email,
          data: update,
        },
      },
    ];

    return MoUtils.updateBatch(batchQue);
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
    this.lsSave();
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
    this.lsSave();
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
    this.lsSave();
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
