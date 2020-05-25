import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Content from "~/store/content";

let contentStore: Content;

function initialiseStores(store: Store<any>): void {
  contentStore = getModule(Content, store);
}

export {
  contentStore,
  initialiseStores
}
