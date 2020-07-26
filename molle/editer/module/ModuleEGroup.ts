import {ModuleE} from "~/molle/editer/module/ModuleE";
import {FirestoreMgr} from "~/molle/editer/FirestoreMgr";

export class ModuleEGroup extends ModuleE {
  booking: boolean = false;

  getMemberItemId(key: string) {
    let v = this.itemData.value[key];
    if (!v) {
      v = this.itemData.value[key] = FirestoreMgr.itemsRef.doc().id;
      if (!this.booking) {
        this.booking = true;
        requestAnimationFrame(() => {
          FirestoreMgr.itemsRef.doc(this.itemId).update({value: this.itemData.value});
          this.booking = false;
        });
      }
    }
    return v;
  }
}
