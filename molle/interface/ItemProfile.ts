/**
 * Moduleのデータ型（FireStore互換）
 * ＊refは便宜上
 */
export interface IItemStoreData {
  ref?: firebase.firestore.DocumentReference;

  index?: number;
  moduleId?: string;
  option?: any;
}

/**
 * ModuleのItem設定
 */
export class ItemProfile {
  constructor(opt: {}) {
  }
}

//const
