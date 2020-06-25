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
    //モジュールのvalueの中身をそれぞれwatch
    for (let i in childrenList) {
      let ref = childrenList[i];
      FirestoreMgr.addlistener(
        ref,
        (_itemData: IItemStoreData) => {
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
  deleteChild(ref: firebase.firestore.DocumentReference) {
    console.log("deleteChild", ref);
    FirestoreMgr.removelistener(ref.id, this);
    this.$set(this, "children",
      this.children.filter((via: IItemStoreData) => via.ref.id != ref.id)
    );
    this.itemData!.ref.update({
      value: this.itemData!.value.filter((via: firebase.firestore.DocumentReference) => via.id != ref.id)
    });
  }
}
