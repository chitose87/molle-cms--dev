import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemStoreData} from "~/molle/interface/ItemProfile";
import {IValueStoreData, ValueProfile} from "~/molle/interface/ValueProfile";
import {IStyleStoreData, StyleProfile} from "~/molle/interface/StyleProfile";
import * as firebase from "~/node_modules/firebase";
import {contentStore} from "~/utils/store-accessor";
import {Module} from "~/molle/ssr/module/Module";

export class ModuleE extends Module {
  contentStore = contentStore;

  @Prop() itemData?: IItemStoreData;
  itemRef: firebase.firestore.DocumentReference;
  valueData: IValueStoreData = {};
  styleData: IStyleStoreData = {};
  valueProfile: ValueProfile = <ValueProfile>{};
  styleProfile: StyleProfile = <StyleProfile>{};

  unsubscribes: (() => void)[] = [];

  constructor(...args: any[]) {
    super(args);
    this.itemRef = firebase.firestore().doc(this.itemData!.path);
  }

  _created() {

    this.valueData.ref = this.itemRef.parent!.parent!.collection("values").doc(this.itemRef.id);
    this.valueData.ref!.get()
      .then((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) {
          this.valueData.ref!.set({
            type: this.valueProfile.types[0].val
          });
        } else {
          let data = snap.data();
          if (!data!.type || this.valueProfile.types.every((type) => type.val != data!.type)) {
            this.valueData.ref!.update({
              type: this.valueProfile.types[0].val
            });
          }
        }
      });

    this.styleData.ref = this.itemRef.parent!.parent!.collection("styles").doc(this.itemRef.id);
    this.unsubscribes.push(
      this.styleData.ref!.onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
        if (!snap.exists) {
          this.styleData.ref!.set({});
          return;
        }
        this.styleData = Object.assign(this.styleData, snap.data());
      })
    );
  }

  @Watch("contentStore.values")
  changeContentStoreValues() {
    // console.log("changeContentStore", contentStore.values[this.itemData!.ref.id]);
    let v = Object.assign({}, contentStore.values[this.itemRef.id]);
    v.ref = this.valueData.ref;
    this.valueData = v;
  }

  deleteModule() {
    contentStore.removeValue(this.valueData.ref!.id);
    this.itemRef!.delete();
    this.valueData!.ref!.delete();
  }

  _destroyed() {
    while (this.unsubscribes.length) {
      this.unsubscribes.shift()!();
    }
  }
}
