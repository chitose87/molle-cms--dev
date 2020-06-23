import {Vue} from "~/node_modules/nuxt-property-decorator";

export class Module extends Vue {
  // itemProfile?: any;
  itemData?: any;
  id?: string = "";

  // constructor(a:any){
  //   super(a);
  // }

  getClass() {
    let obj: any = {};

    for (let key in this.itemData.style) {
      let value = this.itemData.style[key];
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
