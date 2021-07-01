import firebase from "firebase";
import {Prop, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import {IItemData, INodeObject} from "~/molle/interface";

export class Profile extends Vue {
  @Prop() itemData!: IItemData;
  @Prop() itemId!: string;
  stylePermission?: any;

  /**
   *
   * @param opt
   */
  checkChild(opt: any) {
    let batch = firebase.firestore().batch();

    // for (let key in opt) {
    //   let def = opt[key];
    //   let id = this.itemData!.value[key] || FirestoreMgr.itemsRef.doc().id;
    //   let item = fsStore.items[id];
    //   if (!item) {
    //     let value = Object.assign({}, this.itemData!.value);
    //     value[key] = id;
    //     batch.set(FirestoreMgr.itemsRef.doc(id), def);
    //     batch.update(FirestoreMgr.itemsRef.doc(this.itemData!.id), "value", value);
    //   } else if (item.moduleId != def.moduleId) {
    //     //todo コンバート
    //     batch.set(FirestoreMgr.itemsRef.doc(id), def);
    //   }
    // }
    // batch.commit();
  }

  @Watch("itemData", {immediate: true})
  checkItemData(after?: IItemData, before?: IItemData) {
    let flag = false;
    switch (after!.type) {
      case "children":
        if (!Array.isArray(after!.value)) {
          flag = confirm(`error:valueに異常がありました。\nvalueをリセットしますか？\nitemId:${this.itemId}/${after!.value}`);
          after!.value = [];
        }
        break;
      case "group":
        try {
          for (let name in after!.value) {
            if (!after!.value[name].id) {
              after!.value[name].id = this.itemId + "_" + name;
              flag = true;
            }
          }
        } catch (e) {
          console.log(this.itemId,e)
        }
        break;
      default:
        break;
    }
    if (flag) {
      this.$emit('change');
    }
  }
}
