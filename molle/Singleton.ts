import firebase from "~/node_modules/firebase";
import {IPayload} from "~/molle/interface";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";

export class Singleton {
  static prefix = `${process.env.molleProjectID}/${process.env.molleBrunch}`;
  static payload?: IPayload;
  static user?: any;
  static modules = <{ [key: string]: ModuleLoader }>{};

  static get systemDocRef(): firebase.firestore.DocumentReference {
    return this._systemDocRef ? this._systemDocRef :
      this._systemDocRef = firebase.firestore().doc(this.prefix);
  }

  static get itemsRef(): firebase.firestore.CollectionReference {
    return this._itemsRef ? this._itemsRef :
      this._itemsRef = this.systemDocRef.collection(`items`);
  }

  static get pagesRef(): firebase.firestore.CollectionReference {
    return this._pagesRef ? this._pagesRef :
      this._pagesRef = this.systemDocRef.collection(`pages`);
  }

  static getCurrentPageData($route: any): Promise<any> {
    let id = encodeURIComponent($route.fullPath.substr(1).replace(/\/$/g, ""));
    // console.log("--------",id)
    return this.pagesRef.doc(id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) {
          console.log("no page data", $route.fullPath);
          return;
        }
        return snap.data();
      });
  }

  private static _systemDocRef: firebase.firestore.DocumentReference;
  private static _pagesRef: firebase.firestore.CollectionReference;
  private static _itemsRef: firebase.firestore.CollectionReference;

  static firebaseInit(callBack: (user?: any) => void) {
    if (!this.user) {
      firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
        callBack(user);
      })
    } else {
      callBack();
    }
  }
}

export const StyleAlign = {
  None: {value: "", label: ""},
  Left: {value: "text-left", label: "left"},
  Center: {value: "text-center", label: "center"},
  Right: {value: "text-right", label: "right"},
} as const;
type StyleAlign = typeof StyleAlign[keyof typeof StyleAlign];
