/**
 * "npm run gen:cms" It will be automatically updated
 * to the one excluding the profile at the time of execution
 */

import {Vue} from "nuxt-property-decorator";
/* <imports */
import ScrollTransFiexdBg from "~/molle/module/custom/ScrollTransFiexdBg.vue"
import ScrollTransAnchor from "~/molle/module/custom/ScrollTransAnchor.vue"
import Section from "~/molle-cms/src/module/primitive/Section.vue"
import Box from "~/molle-cms/src/module/primitive/Box.vue"
import BackgroundBox from "~/molle-cms/src/module/primitive/BackgroundBox.vue"
import Headline from "~/molle/module/primitive/Headline.vue"
import Paragraph from "~/molle/module/primitive/Paragraph.vue"
import Picture from "~/molle-cms/src/module/primitive/Picture.vue"
import Button from "~/molle/module/primitive/Button.vue"
import Column from "~/molle-cms/src/module/primitive/Column.vue"
import ColumnBox from "~/molle-cms/src/module/primitive/ColumnBox.vue"
import Embed from "~/molle-cms/src/module/primitive/Embed.vue"
import LinkBox from "~/molle-cms/src/module/primitive/LinkBox.vue"
import IsviewBox from "~/molle-cms/src/module/primitive/IsviewBox.vue"
import ButtonList from "~/molle-cms/src/module/primitive/ButtonList.vue"
import Modal from "~/molle-cms/src/module/primitive/Modal.vue"
import List from "~/molle-cms/src/module/primitive/List.vue"
import ListBox from "~/molle-cms/src/module/primitive/ListBox.vue"
import Gallery from "~/molle-cms/src/module/custom/Gallery.vue"
import GoogleForm from "~/molle-cms/src/module/custom/GoogleForm.vue"
import SocialShare from "~/molle-cms/src/module/custom/SocialShare.vue"
import Card from "~/molle-cms/src/module/custom/Card.vue"
import GoogleMap from "~/molle-cms/src/module/custom/GoogleMap.vue"
import AnchorNavi from "~/molle-cms/src/module/custom/AnchorNavi.vue"
import HorizonCard from "~/molle-cms/src/module/custom/HorizonCard.vue"
import DataBox from "~/molle-cms/src/module/primitive/DataBox.vue"
import DataSet from "~/molle-cms/src/module/primitive/DataSet.vue"
import Reference from "~/molle-cms/src/module/primitive/Reference.vue"
import Table from "~/molle-cms/src/module/primitive/Table.vue"
/* > */
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import Blank from "~/molle-cms/src/Blank.vue";

/* <molleModules */
Vue.component("ScrollTransFiexdBg", ScrollTransFiexdBg);
Vue.component("ScrollTransAnchor", ScrollTransAnchor);
Vue.component("Section", Section);
Vue.component("Box", Box);
Vue.component("BackgroundBox", BackgroundBox);
Vue.component("Headline", Headline);
Vue.component("Paragraph", Paragraph);
Vue.component("Picture", Picture);
Vue.component("Button", Button);
Vue.component("Column", Column);
Vue.component("ColumnBox", ColumnBox);
Vue.component("Embed", Embed);
Vue.component("LinkBox", LinkBox);
Vue.component("IsviewBox", IsviewBox);
Vue.component("ButtonList", ButtonList);
Vue.component("Modal", Modal);
Vue.component("List", List);
Vue.component("ListBox", ListBox);
Vue.component("Gallery", Gallery);
Vue.component("GoogleForm", GoogleForm);
Vue.component("SocialShare", SocialShare);
Vue.component("Card", Card);
Vue.component("GoogleMap", GoogleMap);
Vue.component("AnchorNavi", AnchorNavi);
Vue.component("HorizonCard", HorizonCard);
Vue.component("DataBox", DataBox);
Vue.component("DataSet", DataSet);
Vue.component("Reference", Reference);
Vue.component("Table", Table);
/* > */

Vue.component("DevModuleGuide", Blank);
Vue.component("MolleEditerComp", Blank);
Vue.component("AddModuleComp", Blank);
Vue.component("ModuleLoader", ModuleLoader);

import allData from "~/molle/nuxt-config/firestore-snap.json";
Vue.prototype.$getText = (str: string) => {
  for (let item of allData.datalist) {
    if (!str.includes("${")) break;
    str = str.replace(new RegExp("\\${" + item.id+"}", "g"), item.value);
  }
  return str;
}
