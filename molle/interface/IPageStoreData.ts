import * as firebase from "~/node_modules/firebase";

export interface IPageStoreData {
  //ロジックの中で設定される
  ref: firebase.firestore.DocumentReference;

  path: string;
  main: firebase.firestore.DocumentReference;
  updateTime: firebase.firestore.Timestamp;
}
