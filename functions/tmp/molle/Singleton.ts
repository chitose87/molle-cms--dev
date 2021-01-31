import firebase from "~/node_modules/firebase";
import {IPayload} from "~/molle/interface";

export class Singleton {
  static prefix = `${process.env.molleProjectID}/${process.env.molleBrunch}`;
  static payload?: IPayload;

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

  private static _systemDocRef: firebase.firestore.DocumentReference;
  private static _pagesRef: firebase.firestore.CollectionReference;
  private static _itemsRef: firebase.firestore.CollectionReference;

  static firebaseInit(callBack: () => void) {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
      });
      firebase.auth().onAuthStateChanged((user) => {
        callBack();
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
