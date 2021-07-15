/**
 * "npm run gen:cms" It will be automatically updated
 * to the one excluding the profile at the time of execution
 */

import {Vue} from "nuxt-property-decorator";
/* <imports */
import Box from "~/molle/module/primitive/Box.vue"
import BackgroundBox from "~/molle/module/primitive/BackgroundBox.vue"
import Headline from "~/molle/module/primitive/Headline.vue"
import Paragraph from "~/molle/module/primitive/Paragraph.vue"
import Picture from "~/molle/module/primitive/Picture.vue"
import LinkPicture from "~/molle/module/primitive/LinkPicture.vue";
import Button from "~/molle/module/primitive/Button.vue"
import Column from "~/molle/module/primitive/Column.vue"
import ColumnBox from "~/molle/module/primitive/ColumnBox.vue"
import Gallery from "~/molle/module/custom/Gallery.vue"
import GoogleForm from "~/molle/module/custom/GoogleForm.vue"
import SocialShare from "~/molle/module/custom/SocialShare.vue"
import Modal from "~/molle/module/primitive/Modal.vue"
import Card from "~/molle/module/custom/Card.vue"
import GoogleMap from "~/molle/module/custom/GoogleMap.vue"
import Table from "~/molle/module/primitive/Table.vue"
/* > */
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import Blank from "~/molle/ui/Blank.vue";

declare module "vue/types/vue" {
  interface Vue {
    // @ts-ignore
    $molleModules: {
      [key: string]: {
        ref: any;
        profile?: any;
        profileName?: string;
        def?: any;
        convert?: string[];
        black?: string[];
        white?: string[];
        icon?: string;
      };
    }
  }
}
const pluginStatic = Vue.prototype.$molleModules = {
  /* <molleModules */
 Box : {ref:  Box },
 BackgroundBox : {ref:  BackgroundBox },
 Headline : {ref:  Headline },
 Paragraph : {ref:  Paragraph },
 Picture : {ref:  Picture },
 LinkPicture : {ref:  LinkPicture },
 Button : {ref:  Button },
 Column : {ref:  Column },
 ColumnBox : {ref:  ColumnBox },
 Gallery : {ref:  Gallery },
 GoogleForm : {ref:  GoogleForm },
 SocialShare : {ref:  SocialShare },
 Modal : {ref:  Modal },
 Card : {ref:  Card },
 GoogleMap : {ref:  GoogleMap },
 Table : {ref:  Table }
/* > */
};
// export type molleModules = typeof molleModules[keyof typeof molleModules];

Vue.component("AddModuleComp", Blank);
Vue.component("ModuleLoader", ModuleLoader);
//modules
for (let key in pluginStatic) {
  // @ts-ignore
  Vue.component(key, pluginStatic[key].ref);
}
