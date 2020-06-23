import firebase from "firebase";
import {IItemStoreData} from "~/molle/interface/ItemProfile";
import {contentStore} from "~/utils/store-accessor";
import {Singleton} from "~/molle/Singleton";

interface IWatcher {
  watcher: any;
  ref: firebase.firestore.DocumentReference;
  unsubscribe: () => void;
}

export class ItemStoreDataMgr {

  static list: { [key: string]: IWatcher[] } = {};

  /**
   *
   * @param ref
   * @param onNext
   * @param existsOpt
   */
  static get(
    ref: firebase.firestore.DocumentReference,
    onNext?: (itemData: IItemStoreData) => void,
    existsOpt?: any
  ) {
    ref.get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) {
          if (existsOpt) {
            ref.set(existsOpt);
          }
          return;
        }

        let v = Singleton.addItem(snap);
        onNext && onNext(v);
      });
  }

  /**
   *
   * @param watcher
   * @param ref
   * @param onNext
   * @param existsOpt
   */
  static watch(
    watcher: any,
    ref: firebase.firestore.DocumentReference,
    onNext?: (itemData: IItemStoreData) => void,
    existsOpt?: any
  ) {
    let arr = this.list[ref.id] || [];
    if (arr.some(value => value.watcher == watcher)) {
      return;
    }

    arr.push({
      watcher: watcher,
      ref: ref,
      unsubscribe: ref
        .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
          if (!snap.exists) {
            if (existsOpt) {
              ref.set(existsOpt);
            }
            return;
          }

          let v = Singleton.addItem(snap);
          onNext && onNext(v);
        })
    });
    this.list[ref.id] = arr;
  }

  /**
   *
   * @param watcher
   * @param idOpt
   */
  static unwatch(watcher: any, idOpt?: string) {
    for (let id in this.list) {
      if (idOpt && idOpt != id) continue;
      this.list[id] = this.list[id].filter(item => {
        if (item.watcher == watcher) {
          item.unsubscribe();
        }
        return item.watcher != watcher;
      });
    }
  }
}
