export interface IPageData {
  path: string;
  itemId?: string;
  title?: string;
  description?: string;

  displayTitle?: string;
  ogpImg?: string;

  date?: string;
  utc?: string;
  noExport?: boolean;

  option?: any;
}

export interface IItemData {
  id: string;
  type: string;
  // follower?: { [key: string]: IItemStoreData };
  // superValue?: any//TODO<IValueStoreData>;

  //firestore互換
  name?: string;
  moduleId: string;
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
}

export interface IPayload {
  id: string;
  pageData: IPageData;
  pages: { [key: string]: IPageData };
  items: { [key: string]: IItemData };
}
