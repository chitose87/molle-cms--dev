import {IItemStoreData} from "~/molle/interface/ItemProfile";
import firebase from "~/node_modules/firebase";
import {ModuleE} from "~/molle/editer/module/ModuleE";
import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";
import {InitialValue} from "~/molle/editer/module/index";

export class ModuleEContainer extends ModuleE {
  children: any[] = [];

  init(initialValue: InitialValue, onUpdate?: () => void) {
    super.init(initialValue, () => {
      this.children.length = 0;
      for (let i in this.itemData!.value) {
        let childRef = this.itemData!.value[i];

        childRef.get()
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            if (!snap.exists) {
              //todo
              return;
            }
            this.$set(this.children, i, {
              ref: childRef,
              moduleId: snap.data()!.moduleId
            });
            onUpdate && onUpdate();
          });
      }
    });
  }

  /**
   *
   * @param ref
   */
  indexSwapChild(ref: firebase.firestore.DocumentReference) {
    let value = this.itemData!.value.concat();

    console.log(this.children)
    for (let i = 0; i < this.children.length - 1; i++) {
      let child: any = this.children[i];
      console.log(child.ref.id, ref.id)
      if (child.ref.id == ref.id) {
        this.children[i] = this.children[i + 1];
        this.children[i + 1] = child;

        value[i] = value[i + 1];
        value[i + 1] = child.ref;

        console.log(value)

        this.$set(this, "children", this.children);
        FirestoreMgr.itemUpdate(this.itemRef!, {value: value});
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
    this.$set(this, "children",
      this.children.filter((via: IItemStoreData) => via.ref.id != ref.id)
    );
    FirestoreMgr.itemUpdate(this.itemData!.ref, {
      value: this.itemData!.value.filter((via: firebase.firestore.DocumentReference) => via.id != ref.id)
    });
  }
}
