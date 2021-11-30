export interface IPageData {
  path: string;//URL todo:TBDel?
  itemId?: string;//メインになるitemid
  title?: string;//meta title
  description?: string;//meta description

  displayTitle?: string;//title
  displayTitleSub?: string;//title
  ogpImg?: string;//SNS用画像パス

  date?: string;//サイト日付設定
  utc?: string;//
  noExport?: boolean;//index.htmlを出力するかどうか
  theme?: string;//ページテーマ
  type?: string;//区分

  redirect?: string;
}

export interface IItemData {
  // id: string;
  type: string;
  // follower?: { [key: string]: IItemStoreData };
  // superValue?: any//TODO<IValueStoreData>;

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

  tagId: string;
  tagClass: string;

  dev?: any;
  noExport: boolean;
  //   log?: any;
  // };
}

export interface INodeObject {
  id: string;
  // uid: string;
  fixedModuleId?: string;
  order?: number;
  opt?: { enabled: string[] };
}

export interface IPayload {
  id: string;
  pageData: IPageData;
  pages: { [key: string]: IPageData };
  items: { [key: string]: IItemData };
}

export interface ILogsData {
  timestamp: any;
  uid: string;
  update: any;
}
