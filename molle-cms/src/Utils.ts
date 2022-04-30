import {Vue} from "nuxt-property-decorator";
import {IItemData, ILogsData, IPageData} from "./interface";
import {Singleton} from "./Singleton";
import firebase from "firebase";

/**
 * 全体を通してのユーティリティクラス
 */
export class Utils {
  /**
   *
   * @param pageData
   */
  static setMeta(pageData: IPageData) {
    let obj: any = {
      title: "",
      meta: <any>[],
      link: [],
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
    if (pageData.cssPlugin) {
      pageData.cssPlugin.split(/\r\n|\n/)
        .forEach((css) => {
          obj.link.push(
            {
              rel: "stylesheet",
              href: css,
            },
          );
        });
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
   * ネームスペースに基づく、ページリスト作成
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
