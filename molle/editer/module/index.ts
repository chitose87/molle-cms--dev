import {Vue} from "~/node_modules/vue-property-decorator";
import {setMolleModules} from "~/molle/ssr/module";
import HeadlineE from "./HeadlineE.vue";
import BoxE from "~/molle/editer/module/BoxE.vue";
import ItemOptionSelect from "~/molle/editer/module/item-option/Select.vue";
import ItemOptionAddModule from "~/molle/editer/module/item-option/AddModule.vue";

export function setMolleEditerModules() {
  setMolleModules();
  //item-options
  Vue.component("ItemOptionAddModule", ItemOptionAddModule);
  Vue.component("ItemOptionSelect", ItemOptionSelect);

  //modules
  Vue.component("BoxE", BoxE);
  Vue.component("HeadlineE", HeadlineE);

}
