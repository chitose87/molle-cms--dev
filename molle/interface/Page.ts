export interface IPage {
  path: string;
  items: IPageItem[];
  // styles: any[];
  // values
}

export interface IPageItem {
  ref?: any;

  index?: number;
  moduleId?: string;
  option?: any;
  // style?: any;

  // valueRef?: any;
}

export type IPageItemType = "ref" | "index" | "moduleId";
