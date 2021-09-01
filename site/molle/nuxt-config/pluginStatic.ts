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
import Blank from "~/molle-cms/src/Blank.vue";

/* <molleModules */
Vue.component("Box", Box);
Vue.component("BackgroundBox", BackgroundBox);
Vue.component("Headline", Headline);
Vue.component("Paragraph", Paragraph);
Vue.component("Picture", Picture);
Vue.component("Button", Button);
Vue.component("Column", Column);
Vue.component("ColumnBox", ColumnBox);
Vue.component("Gallery", Gallery);
Vue.component("GoogleForm", GoogleForm);
Vue.component("SocialShare", SocialShare);
Vue.component("Modal", Modal);
Vue.component("Card", Card);
Vue.component("GoogleMap", GoogleMap);
Vue.component("Table", Table);
/* > */

Vue.component("MolleEditerComp", Blank);
Vue.component("AddModuleComp", Blank);
Vue.component("ModuleLoader", ModuleLoader);
