/**
 * Moduleのデータ型（FireStore互換）
 * ＊refは便宜上
 */
export interface IValueStoreData {
  // ref?: firebase.firestore.DocumentReference;
  path: string;
  childrenId?: string[];
  superValue?: IValueStoreData;

  name?: string;
  type?: string;
  value?: any;
  extendsId?: string;
}

/**
 * ModuleのValue設定
 */
export class ValueProfile {
  types: { val: string; label: string }[];

  constructor(opt: { types: { val: string; label: string }[] }) {
    this.types = opt.types;
  }
}

//const
export const ValueType = {
  text: {label: "文字", val: "text"},
  // paragraph: {label: "複数行", val: "paragraph"},
  number: {label: "数字", val: "number"},
  img: {label: "画像", val: "img"},
  html: {label: "HTML", val: "html"},
  children: {label: "ID List", val: "children"}
} as const;
type ValueType = typeof ValueType[keyof typeof ValueType];
