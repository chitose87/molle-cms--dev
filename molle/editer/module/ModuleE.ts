import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemStoreData} from "~/molle/interface/ItemProfile";
import {ValueProfile} from "~/molle/interface/ValueProfile";
import {StyleProfile} from "~/molle/interface/StyleProfile";
import {Module} from "~/molle/ssr/module/Module";
import {Singleton} from "~/molle/Singleton";
import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
import {InitialValue} from "~/molle/editer/module/index";

export class ModuleE extends Module {
  store = Singleton.store;

  //itemData: IItemStoreData = {};
  @Prop() itemRef?: firebase.firestore.DocumentReference;

  valueProfile?: ValueProfile;
  styleProfile?: StyleProfile;

  constructor(...args: any[]) {
    super(args);
  }

  init(initialValue: InitialValue, onUpdate?: () => void) {
    if (!this.valueProfile) {
      throw new Error("valueProfileの設定が必要です");
    }
    //type が規定されたものかチェック
    //   if (
    //     !this.itemData!.type ||
    //     this.valueProfile!.types.every((type) => type.val != this.itemData!.type)
    //   ) {
    //     FirestoreMgr.itemUpdate(this.itemData!.ref, {
    //       type: this.valueProfile!.types[0].val,
    //     });
    //   }

    FirestoreMgr.addlistener(
      this.itemRef!,
      (itemData: IItemStoreData) => {
        try {
          this.$set(this, "itemData", itemData);
          onUpdate && this.$nextTick(onUpdate);
        } catch (e) {
          console.log(e);
          FirestoreMgr.removelistenerByWatcher(this);
        }
      },
      {
        initial: initialValue,
        force: true,
        watcher: this
      }
    );
  }

  _created() {
  }

  indexSwap() {
    let parent: any = this.$parent;
    if (parent.indexSwapChild) {
      parent.indexSwapChild(this.itemRef!);
    }
  }

  deleteModule() {
    let parent: any = this.$parent;
    if (parent.deleteChild) {
      parent.deleteChild(this.itemRef!);
    }
    this.itemRef!.delete();
  }

  _destroyed() {

    // if (!this.unsubscribes) return;
    // while (this.unsubscribes.length) {
    //   this.unsubscribes.shift()!();
    // }
  }
}
