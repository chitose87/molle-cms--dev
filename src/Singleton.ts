import firebase from "~/node_modules/firebase";
import {IPayload} from "~/src/interface";

export class Singleton {
  static systemVersion = "0.2";
  static payload?: IPayload;

  static get systemDocRef(): firebase.firestore.DocumentReference {
    return this._systemDocRef ? this._systemDocRef :
      this._systemDocRef = firebase.firestore().doc(`version/${this.systemVersion}`);
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
