export interface IPage {
  path: string;
  items: IPageItem[];
}

export interface IPageItem {
  id?: string;
  index?: number;
  moduleId?: string;

  valueRef?: any;
}

export type IPageItemType = "id" | "index" | "moduleId" | "valueRef";
