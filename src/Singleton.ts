import firebase from "~/node_modules/firebase";

export class Singleton {
  static systemVersion = "0.2";
  static systemDocRef: firebase.firestore.DocumentReference;
  static pagesRef: firebase.firestore.CollectionReference;
  static itemsRef: firebase.firestore.CollectionReference;

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
        this.systemDocRef = firebase.firestore().doc(`version/${this.systemVersion}`);
        this.pagesRef = this.systemDocRef.collection("pages");
        this.itemsRef = this.systemDocRef.collection("items");

        callBack();
      })
    } else {
      callBack();
    }
  }
}
