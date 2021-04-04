import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemData, IPageData, IPayload} from "~/molle/interface";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";

export class Page extends Vue {
  static MOLLE__DELETE_WITH_STATIC_MODE=true;

  @Prop() pageData?: IPageData;

  private unsubscribe?: () => void;

  /**
   *
   */
  get localPageData(): IPageData {
    if (this.$nuxt.context.isDev) {
      if (this.pageData) {
        return this.pageData;
      } else {
        if (!this.unsubscribe) {
          this.unsubscribe = Singleton.pagesRef
            .doc(encodeURIComponent(this.$route.fullPath.substr(1).replace("--preview/", "")))
            .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
              if (!snap.exists) {
                console.log("no page data");
                return;
              }
              // console.log(snap.data())
              this.$set(this, "pageData", snap.data())
            });
        }
        return {title: "no data", path: ""};
      }
    } else {
      return this.$nuxt.context.payload.pageData;
    }
  }

  /**
   *
   * @protected
   */
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
