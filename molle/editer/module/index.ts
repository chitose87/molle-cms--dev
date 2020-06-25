import {Vue} from "~/node_modules/vue-property-decorator";
import {setMolleModules} from "~/molle/ssr/module";
import HeadlineE from "./HeadlineE.vue";
import BoxE from "~/molle/editer/module/BoxE.vue";
import ParagraphE from "~/molle/editer/module/ParagraphE.vue";

import ItemOptionSelect from "~/molle/editer/module/item-option/Select.vue";
import ItemOptionAddModule from "~/molle/editer/module/item-option/AddModule.vue";

export const molleEditerModules = {
  BoxE: BoxE,
  HeadlineE: HeadlineE,
  ParagraphE: ParagraphE,
};

export const BoxInitial = {
  moduleId: "Box",
  value: [],
  type: "children",
};

export function setMolleEditerModules() {
  setMolleModules();


  //item-options
  Vue.component("ItemOptionAddModule", ItemOptionAddModule);
  Vue.component("ItemOptionSelect", ItemOptionSelect);

  //modules
  for (let key in molleEditerModules) {
    // @ts-ignore
    Vue.component(key, molleEditerModules[key]);
  }
}
