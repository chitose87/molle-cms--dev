import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemStoreData, ItemProfile} from "~/molle/interface/ItemProfile";
import {IValueStoreData, ValueProfile} from "~/molle/interface/ValueProfile";
import {IStyleStoreData, StyleProfile} from "~/molle/interface/StyleProfile";
import * as firebase from "~/node_modules/firebase";
import {contentStore} from "~/utils/store-accessor";
import {Module} from "~/molle/ssr/module/Module";
import {Singleton} from "~/molle/Singleton";

export class ModuleE extends Module {
  contentStore = contentStore;
  store = Singleton.store;

  // itemProfile?: ItemProfile;
  @Prop() itemData?: IItemStoreData;
  // @Prop() itemData?: IValueStoreData;
  // itemRef: firebase.firestore.DocumentReference;
  // valueRef: firebase.firestore.DocumentReference;
  // styleRef: firebase.firestore.DocumentReference;
  // styleData?: IStyleStoreData;

  valueProfile?: ValueProfile;
  styleProfile?: StyleProfile;

  // unsubscribes: (() => void)[] = [];

  constructor(...args: any[]) {
    super(args);
    // this.itemRef = firebase.firestore().doc(this.itemData!.path);
    // this.valueRef = firebase.firestore().doc(this.itemData!.path);
    // this.styleRef = this.itemRef.parent!.parent!.collection("styles").doc(this.itemRef.id);
  }

  _created() {
    if (!this.valueProfile) {
      throw new Error("valueProfileの設定が必要です");
    }
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
    // contentStore.removeValue(this.valueRef.id);
    // this.itemRef!.delete();
    // this.valueRef.delete();
  }

  _destroyed() {

    // if (!this.unsubscribes) return;
    // while (this.unsubscribes.length) {
    //   this.unsubscribes.shift()!();
    // }
  }
}
