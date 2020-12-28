export interface IPageData {
  path: string;
  itemId?: string;
}

export interface IItemData {
  moduleId: string;
}

export interface IPayload {
  id: string;
  pages: { [key: string]: IPageData };
  items: { [key: string]: IItemData };
}
