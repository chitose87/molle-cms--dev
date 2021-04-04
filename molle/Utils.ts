import {Vue} from "~/node_modules/nuxt-property-decorator";
import {IPageData} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";

export class Utils {

  static setMeta(self: Vue) {
    try {
      let obj: any = {
        title: "",
        meta: <any>[],
      };

      if (!self.$nuxt.context.isDev) {
        //gen
        let pageData = self.$nuxt.context.payload.pageData;
        obj.title = pageData.title || pageData.displayTitle || "";
        if (pageData.description) {
          obj.meta.push(
            {hid: "description", name: "description", content: pageData.description},
            {hid: "og:description", property: "og:description", content: pageData.description,},
          );
        }
        if (pageData.ogpImg) {
          obj.meta.push(
            {hid: "og:image", property: "og:image", content: pageData.ogpImg,},
            {hid: "twitter:image", property: "twitter:image", content: pageData.ogpImg,},
          );
        }
      } else {
        //dev
      }
      if (obj.title) obj.title += " - ";
      obj.title += process.env.title;
      obj.meta.push({hid: "og:title", name: "og:title", content: obj.title});

      return obj;
    } catch (e) {
      //static
      return false;
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
    if (context.isDev) {
      //SPA,DEV
      Singleton.firebaseInit(() => {
        Singleton.pagesRef.onSnapshot(
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
    } else {
      //gen
      for (let i in context.payload.pages) {
        let pageData = context.payload.pages[i];
        if (pageData.path.indexOf("news/") == 0) {
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
