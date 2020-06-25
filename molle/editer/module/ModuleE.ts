import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemStoreData} from "~/molle/interface/ItemProfile";
import {ValueProfile} from "~/molle/interface/ValueProfile";
import {StyleProfile} from "~/molle/interface/StyleProfile";
import {contentStore} from "~/utils/store-accessor";
import {Module} from "~/molle/ssr/module/Module";
import {Singleton} from "~/molle/Singleton";

export class ModuleE extends Module {
  contentStore = contentStore;
  store = Singleton.store;

  @Prop() itemData?: IItemStoreData;

  valueProfile?: ValueProfile;
  styleProfile?: StyleProfile;

  constructor(...args: any[]) {
    super(args);
  }

  _created() {
    if (!this.valueProfile) {
      throw new Error("valueProfileの設定が必要です");
    }
    //type が規定されたものかチェック
    if (
      !this.itemData!.type ||
      this.valueProfile!.types.every((type) => type.val != this.itemData!.type)
    ) {
      this.itemData!.ref.update({
        type: this.valueProfile!.types[0].val
      });
    }
  }

  deleteModule() {
    let parent: any = this.$parent;
    if (parent.deleteChild) {
      parent.deleteChild(this.itemData!.ref)
    }
    this.itemData!.ref.delete();
  }

  _destroyed() {

    // if (!this.unsubscribes) return;
    // while (this.unsubscribes.length) {
    //   this.unsubscribes.shift()!();
    // }
  }
}
