export interface IPageData {
  path: string;
  itemId?: string;
}

export interface IItemData {
  id: string;
  // follower?: { [key: string]: IItemStoreData };
  // superValue?: any//TODO<IValueStoreData>;

  //firestore互換
  name?: string;
  moduleId: string;
  option?: any;
  // createTime: firebase.firestore.Timestamp;
  // updateTime: firebase.firestore.Timestamp;

  value?: any;
  // extends?: string;
  // selector?: string;
  style?: any;

  class: {
    theme?: string,
    color?: string,
    border?: boolean,
    align?: string,
  }
}

export interface IPayload {
  id: string;
  pages: { [key: string]: IPageData };
  items: { [key: string]: IItemData };
}
