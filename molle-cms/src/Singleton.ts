import firebase from "firebase";

export class Singleton {
  static prefix = `${process.env.molleProjectID}/${process.env.molleBrunch}`;
  static user?: any;

  static get systemDocRef(): firebase.firestore.DocumentReference {
    return this._systemDocRef ? this._systemDocRef :
      this._systemDocRef = firebase.firestore().doc(this.prefix);
  }

  static get itemsRef(): firebase.firestore.CollectionReference {
    return this._itemsRef ? this._itemsRef :
      this._itemsRef = this.systemDocRef.collection(`items`);
  }

  static get logsRef(): firebase.firestore.CollectionReference {
    return this._logsRef ? this._logsRef :
      this._logsRef = this.systemDocRef.collection(`logs`);
  }

  static get pagesRef(): firebase.firestore.CollectionReference {
    return this._pagesRef ? this._pagesRef :
      this._pagesRef = this.systemDocRef.collection(`pages`);
  }

  static getPageIdByPath($route: any): string {
    return encodeURIComponent($route.path.substr(1).replace(/\/$/g, ""));
  }

  static getCurrentPageData($route: any): Promise<any> {
    let id = this.getPageIdByPath($route);
    // console.log("--------",id)
    return this.pagesRef.doc(id)
      .get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) {
          console.log("no page data", $route.path, id);
          return;
        }
        return snap.data();
      });
  }

  private static _systemDocRef: firebase.firestore.DocumentReference;
  private static _pagesRef: firebase.firestore.CollectionReference;
  private static _itemsRef: firebase.firestore.CollectionReference;
  private static _logsRef: firebase.firestore.CollectionReference;

  static firebaseInit(callBack: (user?: any) => void) {
    if (!this.user) {
      firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
        callBack(user);
      });
    } else {
      callBack();
    }
  }

  private static _users?: any;

  static getUsers(cb: any) {
    if (this._users) return cb(this._users);
    firebase.firestore().doc("_settings/users")
      .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        let data = snap.data();
        cb(data);
      });
  }
}

export const StyleAlign = {
  None: {value: "", label: "auto"},
  Left: {value: "text-left", label: "left"},
  Center: {value: "text-center", label: "center"},
  Right: {value: "text-right", label: "right"},
} as const;
type StyleAlign = typeof StyleAlign[keyof typeof StyleAlign];
