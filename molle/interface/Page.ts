export interface IPage {
  path: string;
  items: IPageItem[];
}

export interface IPageItem {
  ref?: any;
  index?: number;
  moduleId?: string;

  // valueRef?: any;
}

export type IPageItemType = "ref" | "index" | "moduleId";
