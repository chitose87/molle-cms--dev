export interface IPageData {
  path: string;//URL
  itemId?: string;//メインになるitemid
  title?: string;//meta title
  description?: string;//meta description

  displayTitle?: string;//title
  ogpImg?: string;//SNS用画像パス

  date?: string;//サイト日付設定
  utc?: string;//
  noExport?: boolean;//出力するかどうか

  option?: any;
}

export interface IItemData {
  // id: string;
  type: string;
  // follower?: { [key: string]: IItemStoreData };
  // superValue?: any//TODO<IValueStoreData>;
  noExport?: boolean;//出力するかどうか

  //firestore互換
  name?: string;//運用ラベル用
  moduleId: string;//
  option?: any;
  createTime: any;
  updateTime: any;

  value?: any;
  // extends?: string;
  // selector?: string;
  style?: any;

  class: {
    theme?: string;
    color?: string;
    border?: boolean;
    align?: string;
  };
}

export interface INodeObject {
  id: string;
  // uid: string;
  fixedModuleId?: string;
  order?: number;
}

export interface IPayload {
  id: string;
  pageData: IPageData;
  pages: { [key: string]: IPageData };
  items: { [key: string]: IItemData };
}
