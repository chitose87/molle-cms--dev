import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
// import Content from "~/store/content";
import LsStore from "~/store/lsStore";
// import FsStore from "~/store/fsStore";

// let contentStore: Content;
let lsStore: LsStore;
// let fsStore: FsStore;

function initialiseStores(store: Store<any>): void {
  // contentStore = getModule(Content, store);
  lsStore = getModule(LsStore, store);
  // fsStore = getModule(FsStore, store);
}

export {
  // contentStore,
  lsStore,
  // fsStore,
  initialiseStores
}
