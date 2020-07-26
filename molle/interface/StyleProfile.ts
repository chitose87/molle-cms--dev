/**
 * Moduleのデータ型（FireStore互換）
 * ＊refは便宜上
 */
export interface IStyleStoreData {
  ref?: firebase.firestore.DocumentReference;

  border?: boolean
  container?: boolean
  align?: string
  theme?: string
  color?: string
}

/**
 * ModuleのStyle設定
 */
export class StyleProfile {
  private defaultData: IStyleStoreData = {};
  themeCollection?: string[];
  colorCollection?: string[];
  permission: any = {};

  constructor(opt: {
    border?: boolean,
    container?: boolean,
    align?: StyleAlign,
    theme?: { default: string, select: string[] },
    color?: { default: string, select: string[] },
  }) {
    if (opt.theme) this.themeCollection = opt.theme.select;
    if (opt.color) this.colorCollection = opt.color.select;

    for (let key in opt) {
      // @ts-ignore
      this.defaultData[key] = opt[key].default || opt[key];
      this.permission[key] = true;
    }
  }

  /**
   * Moduleの初期化で設定されたデフォルトデータを複製
   */
  getDefaultData() {
    return Object.assign({}, this.defaultData);
  }
}

//const
export const StyleAlign = {
  None: {value: "", label: ""},
  Left: {value: "text-left", label: "left"},
  Center: {value: "text-center", label: "center"},
  Right: {value: "text-right", label: "right"},
} as const;
type StyleAlign = typeof StyleAlign[keyof typeof StyleAlign];
