import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemData, IPageData, IPayload} from "~/molle/interface";
import {lsStore} from "~/utils/store-accessor";

export class Page extends Vue {
  lsStore = lsStore;

  @Prop() pageData?: IPageData;
  get localPageData(): IPageData {
    return (lsStore.payload && lsStore.payload.pageData) || this.pageData || {};
  }

  protected createMeta() {
    let obj: any = {
      title: this.localPageData.title || this.localPageData.displayTitle || "",
      meta: <any>[],
    };
    if (obj.title) obj.title += " - ";
    obj.title += process.env.title;

    if (this.localPageData.description) {
      obj.meta.push(
        {
          hid: "description",
          name: "description",
          content: this.localPageData.description,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.localPageData.description,
        },
      );
    }
    if (this.localPageData.ogpImg) {
      obj.meta.push(
        {
          hid: "og:image",
          property: "og:image",
          content: this.localPageData.ogpImg,
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content: this.localPageData.ogpImg,
        },
      );
    }
    obj.meta.push({hid: "og:title", name: "og:title", content: obj.title});

    return obj;
  }
}
