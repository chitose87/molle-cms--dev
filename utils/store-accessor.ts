import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Page from "~/store/page";

let pageStore: Page;

function initialiseStores(store: Store<any>): void {
  pageStore = getModule(Page, store);
}

export {
  pageStore,
  initialiseStores
}
