import {Prop, Vue} from "~/node_modules/nuxt-property-decorator";

export class Module extends Vue {
  @Prop() itemDataProp?: any;
  @Prop() payload?: any;
  itemData: any = {};
  id?: string = "";

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
