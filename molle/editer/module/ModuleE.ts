import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemStoreData} from "~/molle/interface/ItemProfile";
import {ValueProfile} from "~/molle/interface/ValueProfile";
import {StyleProfile} from "~/molle/interface/StyleProfile";
import {contentStore} from "~/utils/store-accessor";
import {Module} from "~/molle/ssr/module/Module";
import {Singleton} from "~/molle/Singleton";
import firebase from "firebase";
import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

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
      FirestoreMgr.itemUpdate(this.itemData!.ref, {
        type: this.valueProfile!.types[0].val,
      });
    }

    //
    // console.log(this.itemData!.extends)
    if (this.itemData!.extends) {
      // FirestoreMgr.addlistener(
      //   this.itemData!.extends,
      //   (itemData: IItemStoreData) => {
      //     this.itemData!.superValue = itemData.value || itemData.superValue;
      //   },
      //   {
      //     force: true,
      //     watcher: this
      //   }
      // );
    }
  }

  indexSwap() {
    let parent: any = this.$parent;
    if (parent.indexSwapChild) {
      parent.indexSwapChild(this.itemData!.ref);
    }
  }

  deleteModule() {
    let parent: any = this.$parent;
    if (parent.deleteChild) {
      parent.deleteChild(this.itemData!.ref);
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
