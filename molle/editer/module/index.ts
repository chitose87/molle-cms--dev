import {Vue} from "~/node_modules/vue-property-decorator";
import {setMolleModules} from "~/molle/ssr/module";
import BoxE from "~/molle/editer/module/BoxE.vue";
import ColumnE from "~/molle/editer/module/ColumnE.vue";
import HeadlineE from "./HeadlineE.vue";
import ParagraphE from "~/molle/editer/module/ParagraphE.vue";

import ItemOptionSelect from "~/molle/editer/module/item-option/Select.vue";
import ItemOptionAddModule from "~/molle/editer/module/item-option/AddModule.vue";
import firebase from "firebase";
import ItemOptionButton from "~/molle/editer/module/item-option/Button.vue";
import ItemOptionInput from "~/molle/editer/module/item-option/Input.vue";

export const molleEditerModules = {
  BoxE: BoxE,
  ColumnE: ColumnE,
  HeadlineE: HeadlineE,
  ParagraphE: ParagraphE,
};

export const InitialValue = {
  Box: {
    moduleId: "Box",
    value: [],
    type: "children",
    style: {},
    createTime: firebase.firestore.FieldValue.serverTimestamp()
  },
  Column: {
    moduleId: "Column",
    value: [],
    type: "children",
    style: {},
    option: {
      // number: 2,
      // width: "50%",
    },
    createTime: firebase.firestore.FieldValue.serverTimestamp()
  },
  Headline: {
    moduleId: "Headline",
    value: "Lorem ipsum...",
    type: "text",
    option: {
      lv: "h3"
    },
    style: {},
    createTime: firebase.firestore.FieldValue.serverTimestamp()
  },
  Paragraph: {
    moduleId: "Paragraph",
    value: "Lorem ipsum...",
    type: "text",
    style: {},
    createTime: firebase.firestore.FieldValue.serverTimestamp()
  }
} as const;
export type InitialValue = typeof InitialValue[keyof typeof InitialValue];

export function setMolleEditerModules() {
  setMolleModules();

  //item-options
  Vue.component("ItemOptionAddModule", ItemOptionAddModule);
  Vue.component("ItemOptionSelect", ItemOptionSelect);
  Vue.component("ItemOptionButton", ItemOptionButton);
  Vue.component("ItemOptionInput", ItemOptionInput);

  //modules
  for (let key in molleEditerModules) {
    // @ts-ignore
    Vue.component(key, molleEditerModules[key]);
  }
}
