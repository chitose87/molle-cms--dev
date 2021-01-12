import {Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import {IItemData} from "~/molle/interface";

export class Module extends Vue {
  @Prop() itemData!: IItemData;

  // @Prop() payload?: any;
  // @Prop() itemData?: any;
  //
  getClass(data: any) {

    let obj: any = {};

    for (let key in data.class) {
      let value = data.class[key];
      switch (key) {
        case "align":
        case "theme":
        case "color":
          //.{value} 形式
          if (!value) break;
          obj[value] = true;

          break;
        default:
          //.{key} 形式
          obj[key] = !!value;
          break;
      }
    }
    if (data.tagClass) {
      for (let v of data.tagClass.split(" ")) {
        obj[v] = true;
      }
    }
    return obj;
  }

  getStyle(data: any) {
    let obj: any = {};
    for (let key in data.style) {
      let value = data.style[key];
      if (typeof value == "string") {
        value = this.getValue(value);
      }
      obj[key] = value;
    }
    return obj;
  }

  getValue(v?: string) {
    if (v && v.indexOf("gutter") > 0) {
      return parseFloat(v) * parseFloat(process.env.gutter || "18") + "px";
    }
    return v;
  }

  // getStyle(data: any, ...arg: any[]) {
  //   console.log(arg);
  //   let obj: any = {};
  //   if (data && data.option) {
  //     for (let key of arg) {
  //       if (data.option[key]) obj[key] = data.option[key];
  //     }
  //   }
  //   return obj;
  // }
}
