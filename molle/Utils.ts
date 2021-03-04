import {IPageData} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";

export class Utils {

  static getPageList(ns: string, callBack: (list: IPageData[]) => void, opt?: any) {
    let unsubscribe: () => void;
    let list: IPageData[] = [];
    if (lsStore.isSSG) {
      for (let i in lsStore.payload.pages) {
        let pageData = lsStore.payload.pages[i];
        if (pageData.path.indexOf("news/") == 0) {
          if (!pageData.noExport) list.push(pageData);
        }
      }
      sort(list, opt);
      callBack(list);
    } else {
      //SPA,DEV
      Singleton.firebaseInit(() => {
        unsubscribe = Singleton.pagesRef.onSnapshot(
          (snap: firebase.firestore.QuerySnapshot) => {
            snap.forEach((_snap: firebase.firestore.DocumentSnapshot) => {
              let pageData = <IPageData>_snap.data();
              if (pageData.path.indexOf("news/") == 0) {
                list.push(pageData);
              }
            });
            sort(list, opt);
            callBack(list);
          },
        );
      });
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
