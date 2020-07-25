import {Vue} from "~/node_modules/vue-property-decorator";
import Headline from "~/molle/ssr/module/Headline.vue";
import Box from "~/molle/ssr/module/Box.vue";
import Paragraph from "~/molle/ssr/module/Paragraph.vue";
import Column from "~/molle/ssr/module/Column.vue";
import Card from "~/molle/ssr/module/Card.vue";
import Picture from "~/molle/ssr/module/Picture.vue";

export const molleModules = {
  Box: Box,
  Column: Column,
  Headline: Headline,
  Paragraph: Paragraph,
  Picture: Picture,

  Card: Card,
};

export function setMolleModules() {
  //modules
  for (let key in molleModules) {
    // @ts-ignore
    Vue.component(key, molleModules[key]);
  }
}
