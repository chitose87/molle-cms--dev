import {IItemStoreData} from "~/molle/interface/ItemProfile";
import firebase from "firebase";
import {Singleton} from "~/molle/Singleton";

interface Listener {
  watcher?: any;
  callBack: (itemData: IItemStoreData) => void,
}

/**
 * 重複してonSnapshotしないように、（重複しても問題ない気もするけども）
 * またunsubscribeを簡単に管理できるように。
 * opt.forceによって、初回にかならずレスポンスを得られるように。
 * opt.initialは、無かった場合上書き、すでに登録されていたら無視される
 */
export class FirestoreMgr {
  static listenerDic: { [key: string]: Listener[] } = {};
  static unsubscribeDic: { [key: string]: () => void } = {};

  /**
   *
   * @param ref
   * @param callBack
   * @param opt
   */
  static addlistener(
    ref: firebase.firestore.DocumentReference,
    callBack: (itemData: IItemStoreData) => void,
    opt?: {
      initial?: any,
      // once?: boolean,
      force?: boolean,
      watcher?: any,
    }
  ) {

    let listenerList = this.listenerDic[ref.id] || [];
    let first = !!listenerList.length;
    //watchersに追加
    let listener: Listener = {
      callBack: callBack,
    };
    if (opt && opt.watcher) listener.watcher = opt.watcher;
    listenerList.push(listener);
    this.listenerDic[ref.id] = listenerList;

    //
    if (first) {
      // ---------すでにwatchされている
      let data = Singleton.store.items[ref.id];

      //dataが無くて、opt.initialがある場合セット
      if (!data && opt && opt.initial) {
        data = Object.assign({ref: ref}, opt.initial);
        Singleton.store.items[ref.id] = data;
        //todo firesoterに上げる？
      }

      //初回でレスポンスするかどうか
      if (opt && opt.force) {
        callBack(data);
      }
    } else {
      // ---------watchされていない

      this.unsubscribeDic[ref.id] = ref.onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        //空だった場合
        if (!snap.exists && opt && opt.initial) {
          ref.set(opt.initial);
          return;
        }

        let v = Singleton.addItem(snap);
        for (let item of this.listenerDic[ref.id]) {
          item.callBack(v);
        }
      });
    }
  }

  /**
   *
   * @param id
   * @param watcher
   */
  static removelistener(id: string, watcher?: any) {
    // console.log(this.listener[id])
    if (watcher) {
      this.listenerDic[id] = this.listenerDic[id].filter((item: Listener) => item.watcher != watcher);
    } else {
      this.listenerDic[id].length = 0;
    }
    if (this.listenerDic[id].length == 0 && this.unsubscribeDic[id]) {
      this.unsubscribeDic[id]();
      delete this.unsubscribeDic[id];
    }

    console.log(this.listenerDic)
  }
}
