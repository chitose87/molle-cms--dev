import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {ValueProfile} from "~/molle/interface/ValueProfile";
import {StyleProfile} from "~/molle/interface/StyleProfile";
import {Module} from "~/molle/ssr/module/Module";
import {Singleton} from "~/molle/Singleton";
import {InitialValue} from "~/molle/editer/module/index";
import * as firebase from "~/node_modules/firebase";
import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

export class ModuleE extends Module {
  store = Singleton.store;

  //itemData: IItemStoreData = {};
  @Prop() itemId?: string;

  valueProfile?: ValueProfile;
  styleProfile?: StyleProfile;

  unsubscribes = <(() => void)[]>[];

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
    //     FirestoreMgr.itemUpdate(this.itemData!.id, {
    //       type: this.valueProfile!.types[0].val,
    //     });
    //   }

    this.unsubscribes.push(
      FirestoreMgr.itemsRef.doc(this.itemId).onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        if (!this.$el.parentNode) {
          this.destroyed();
          return;
        }
        if (!snap.exists) {
          FirestoreMgr.itemsRef.doc(this.itemId).set(initialValue);
          return;
        }
        let itemData: any = snap.data();
        itemData.id = snap.id;
        this.$set(this, "itemData", itemData);
        onUpdate && this.$nextTick(onUpdate);
      })
    )
  }

  _created() {
  }

  indexSwap() {
    let parent: any = this.$parent;
    if (parent.indexSwapChild) {
      parent.indexSwapChild(this.itemId!);
    }
  }

  deleteModule() {
    let parent: any = this.$parent;
    if (parent.deleteChild) {
      parent.deleteChild(this.itemId!);
    }
    FirestoreMgr.itemsRef.doc(this.itemId).delete();
  }

  destroyed() {
    if (!this.unsubscribes) return;
    while (this.unsubscribes.length) {
      this.unsubscribes.shift()!();
    }
  }
}
