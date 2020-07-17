import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Content from "~/store/content";
import LsStore from "~/store/lsStore";

let contentStore: Content;
let lsStore: LsStore;

function initialiseStores(store: Store<any>): void {
  contentStore = getModule(Content, store);
  lsStore = getModule(LsStore, store);
}

export {
  contentStore,
  lsStore,
  initialiseStores
}
