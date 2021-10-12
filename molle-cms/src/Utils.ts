import {Vue} from "nuxt-property-decorator";
import {IItemData, ILogsData, IPageData} from "./interface";
import {Singleton} from "./Singleton";
import firebase from "firebase";

export class Utils {

  static createItemData(itemId: string) {
    let data: IItemData = Vue.prototype.$molleModules[itemId].def;

    switch (data.type) {
      case "children":
      case "group":
        // デフォルト子要素作成
        for (let i in data.value) {
          let node = data.value[i];
          if (node.id == "{uid}") {
            node.id = Singleton.itemsRef.doc().id;
          }
        }
        break;
    }
    return data;
  }

  /**
   *
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
   *
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

  /**
   *
   * @param pageData
   */
  static setMeta(pageData: IPageData) {
    let obj: any = {
      title: "",
      meta: <any>[],
    };
    obj.title = pageData.title || pageData.displayTitle || "";
    if (pageData.description) {
      obj.meta.push(
        {hid: "description", name: "description", content: pageData.description},
        {hid: "og:description", property: "og:description", content: pageData.description},
      );
    }
    if (pageData.ogpImg) {
      obj.meta.push(
        {hid: "og:image", property: "og:image", content: pageData.ogpImg},
        {hid: "twitter:image", property: "twitter:image", content: pageData.ogpImg},
      );
    }
    return obj;
  }

  /**
   *
   * @param self
   */
  static getPageData(self: any) {
    if (self.$nuxt.context.isDev || process.env.isMolleCms) {
      //SPA,DEV
      return Singleton.getCurrentPageData(self.$route);
    } else {
      //gen static
      return self.$nuxt.context.payload.pageData;
    }
  }

  /**
   *
   * @param ns
   * @param context
   * @param callBack
   * @param opt
   */
  static getPageList(ns: string, context: any, callBack: (list: IPageData[]) => void, opt?: any) {
    let list: IPageData[] = [];
    if (context.isDev || process.env.isMolleCms) {
      //SPA,DEV
      Singleton.firebaseInit(() => {
        Singleton.pagesRef.onSnapshot(
          (snap: firebase.firestore.QuerySnapshot) => {
            snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
              let pageData = <IPageData>_snap.data();
              if (pageData.path.indexOf(ns + "/") == 0) {
                list.push(pageData);
              }
            });
            sort(list, opt);
            callBack(list);
          },
        );
      });
    } else {
      //gen
      if (!context.payload) return;
      for (let i in context.payload.pages) {
        let pageData = context.payload.pages[i];
        if (pageData.path.indexOf(ns + "/") == 0) {
          if (!pageData.noExport) list.push(pageData);
        }
      }
      sort(list, opt);
      callBack(list);
    }

    function sort(list: IPageData[], opt?: any): IPageData[] {
      let mode = (opt && opt.sort) || "asc";//asc | desc
      let attr = opt && opt.attr;
      list.sort((a: any, b: any) => {
        if (attr) {
          return (a[attr] < b[attr]) == (mode == "desc")
            ? 1 : -1;
        } else {
          return (a < b) == (mode == "desc")
            ? 1 : -1;
        }
      });
      if (opt && opt.max && opt.max < list.length) list.length = opt.max;
      return list;
    }

  }
}
