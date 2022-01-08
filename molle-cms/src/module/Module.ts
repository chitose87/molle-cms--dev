import {Prop, Vue, Watch} from "nuxt-property-decorator";
import {IItemData, INodeObject, IPayload} from "../interface";

export class Module extends Vue {
  get loader(): any {
    return this.$parent;
  }

  get parent(): Module {
    return <Module>this.loader.$parent.$parent;
  }

  @Prop({default: () => ({class: {}, option: {}, moduleId: "", id: ""})})
  itemData!: IItemData;

  //SSG only
  @Prop() payload?: IPayload;

  //静的配置時用
  @Prop() static__value?: any;

  @Watch("static__value", {immediate: true}) setStatic__value() {
    this.static__value && this.$set(this.itemData, "value", this.static__value);
  }

  @Prop() static__option?: any;

  @Watch("static__option", {immediate: true}) setStatic__option() {
    this.static__option && this.$set(this.itemData, "option", this.static__option);
  }

  @Prop() static__class?: any;

  @Watch("static__class", {immediate: true}) setStatic__class() {
    this.static__class && this.$set(this.itemData, "class", this.static__class);
  }


  getClass(data: any) {
    // console.log("getClass",data.moduleId)
    let obj: any = {
      noExport: data.noExport
    };

    for (let key in data.class) {
      let value = data.class[key];
      switch (key) {
        case "theme":
          obj[`t-${value}`] = !!value;
          obj[value] = true;//todo tbd
          break;
        case "color":
          obj[`c-${value}`] = !!value;
          obj[value] = true;//todo tbd
          break;
        case "align":
          if (!value) break;
          obj[value] = true;
          break;
        case "alignSp":
          if (!value) break;
          obj[value+"-sp"] = true;
          break;
        case "space":
          obj[`s-${value}`] = !!value;
          break;
        case "margin":
          obj[`m-${value}`] = !!value;
          break;
        case "padding":
          obj[`p-${value}`] = !!value;
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
