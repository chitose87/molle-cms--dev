/**
 * Moduleのデータ型（FireStore互換）
 * ＊refは便宜上
 */
import * as firebase from "~/node_modules/firebase";

export interface IItemStoreData {
  //ロジックの中で設定される
  // ref: firebase.firestore.DocumentReference;
  id: string;
  follower?: { [key: string]: IItemStoreData };
  superValue?: any//TODO<IValueStoreData>;

  //firestore互換
  name?: string;
  moduleId: string;
  option?: any;
  createTime: firebase.firestore.Timestamp;
  updateTime: firebase.firestore.Timestamp;

  //value
  type?: string;

  value?: any;
  // extends?: firebase.firestore.DocumentReference;
  extends?: string;

  //style
  style: {
    theme?: string,
    color?: string,
    border?: boolean,
    align?: string,
  }
}

//const
