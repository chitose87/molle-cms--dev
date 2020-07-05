import {Prop, Vue} from "~/node_modules/nuxt-property-decorator";

export class Module extends Vue {
  @Prop() itemDataProp?: any;
  itemData: any = {};
  id?: string = "";

  getClass(data: any) {
    let obj: any = {};

    for (let key in data.style) {
      let value = data.style[key];
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
    return obj;
  }
}
