import * as firebase from "~/node_modules/firebase";

export interface IPageStoreData {
  //ロジックの中で設定される
  ref: firebase.firestore.DocumentReference;
  // id: string;

  path: string;
  main: string;
  updateTime: firebase.firestore.Timestamp;
}
