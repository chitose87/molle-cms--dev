import {IItemStoreData} from "~/molle/interface/ItemProfile";
import firebase from "~/node_modules/firebase";
import {ModuleE} from "~/molle/editer/module/ModuleE";
import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

export class ModuleEContainer extends ModuleE {
  children: IItemStoreData[] = [];

  /**
   * @param childrenList
   */
  watchChildren(childrenList: firebase.firestore.DocumentReference[]) {
    //valueの中身をそれぞれwatch
    for (let i in childrenList) {
      let ref = childrenList[i];
      FirestoreMgr.addlistener(
        ref,
        (_itemData: IItemStoreData) => {
          console.log(_itemData.ref.id, _itemData)
          if (childrenList.every((ele: any) => ele.id != ref.id)) {
            //多分　valueから消えたやつなのでunwatch
            console.log(ref.id);
            FirestoreMgr.removelistener(ref.id, this);
            return;
          }
          // console.log("set", i, _itemData);
          this.$set(this.children, i, _itemData);
        },
        {
          force: true,
          watcher: this
        }
      )
    }
  }

  /**
   *
   * @param ref
   */
  indexSwapChild(ref: firebase.firestore.DocumentReference) {
    for (let i = 0; i < this.children.length - 1; i++) {
      let itemData = this.children[i];
      if (itemData.ref.id == ref.id) {
        this.children[i] = this.children[i + 1];
        this.children[i + 1] = itemData;

        this.itemData!.value[i] = this.itemData!.value[i + 1];
        this.itemData!.value[i + 1] = itemData.ref;

        this.$set(this, "children", this.children);
        FirestoreMgr.itemUpdate(this.itemData!.ref, {value: this.itemData!.value});
        break;
      }
    }
  }

  /**
   *
   * @param ref
   */
  deleteChild(ref: firebase.firestore.DocumentReference) {
    console.log("deleteChild", ref);
    FirestoreMgr.removelistener(ref.id, this);

    this.$set(this, "children",
      this.children.filter((via: IItemStoreData) => via.ref.id != ref.id)
    );
    FirestoreMgr.itemUpdate(this.itemData!.ref, {
      value: this.itemData!.value.filter((via: firebase.firestore.DocumentReference) => via.id != ref.id)
    });
  }
}
