// text align
export const StyleAlign = {
  None: {value: "", label: ""},
  Left: {value: "text-left", label: "left"},
  Center: {value: "text-center", label: "center"},
  Right: {value: "text-right", label: "right"},
} as const;
type StyleAlign = typeof StyleAlign[keyof typeof StyleAlign];


//
export class StyleParam {
  themeCollection?: string[];
  colorCollection?: string[];

  permission: any = {};
  value: any = {};

  constructor(opt: {
    border?: boolean,
    align?: StyleAlign,
    theme?: { default: string, select: string[] },
    color?: { default: string, select: string[] },
  }) {
    if (opt.theme) this.themeCollection = opt.theme.select;
    if (opt.color) this.colorCollection = opt.color.select;

    for (let key in opt) {
      // @ts-ignore
      this.value[key] = opt[key].default || opt[key];
      this.permission[key] = true;
    }
  }

  getClass() {
    let obj: any = {};

    for (let key in this.permission) {
      switch (key) {
        case "align":
        case "theme":
        case "color":
          if (!this.value[key]) break;
          obj[this.value[key]] = true;
          break;
        //   break;
        default:
          obj[key] = !!this.value[key];
          break;
      }
    }
    return obj;
  }
}

