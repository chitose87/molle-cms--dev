import firebase from "firebase";

import DevModuleGuide from "~/molle-cms/src/module/custom/DevModuleGuide.vue";
import DevModuleGuideProfile from "~/molle-cms/src/module/custom/DevModuleGuideProfile.vue";
/* <imports */
import Section from "~/molle-cms/src/module/primitive/Section.vue";
import SectionProfile from "~/molle-cms/src/module/primitive/SectionProfile.vue";
import Box from "~/molle-cms/src/module/primitive/Box.vue";
import BoxProfile from "~/molle-cms/src/module/primitive/BoxProfile.vue";
import BackgroundBox from "~/molle-cms/src/module/primitive/BackgroundBox.vue";
import BackgroundBoxProfile from "~/molle-cms/src/module/primitive/BackgroundBoxProfile.vue";
import Headline from "~/molle-cms/src/module/primitive/Headline.vue";
import HeadlineProfile from "~/molle-cms/src/module/primitive/HeadlineProfile.vue";
import Paragraph from "~/molle-cms/src/module/primitive/Paragraph.vue";
import ParagraphProfile from "~/molle-cms/src/module/primitive/ParagraphProfile.vue";
import Picture from "~/molle-cms/src/module/primitive/Picture.vue";
import PictureProfile from "~/molle-cms/src/module/primitive/PictureProfile.vue";
import Button from "~/molle-cms/src/module/primitive/Button.vue";
import ButtonProfile from "~/molle-cms/src/module/primitive/ButtonProfile.vue";
import Column from "~/molle-cms/src/module/primitive/Column.vue";
import ColumnProfile from "~/molle-cms/src/module/primitive/ColumnProfile.vue";
import ColumnBox from "~/molle-cms/src/module/primitive/ColumnBox.vue";
import ColumnBoxProfile from "~/molle-cms/src/module/primitive/ColumnBoxProfile.vue";
import Embed from "~/molle-cms/src/module/primitive/Embed.vue";
import EmbedProfile from "~/molle-cms/src/module/primitive/EmbedProfile.vue";
import LinkBox from "~/molle-cms/src/module/primitive/LinkBox.vue";
import LinkBoxProfile from "~/molle-cms/src/module/primitive/LinkBoxProfile.vue";
import IsviewBox from "~/molle-cms/src/module/primitive/IsviewBox.vue";
import IsviewBoxProfile from "~/molle-cms/src/module/primitive/IsviewBoxProfile.vue";
import ButtonList from "~/molle-cms/src/module/primitive/ButtonList.vue";
import ButtonListProfile from "~/molle-cms/src/module/primitive/ButtonListProfile.vue";
import Modal from "~/molle-cms/src/module/primitive/Modal.vue";
import ModalProfile from "~/molle-cms/src/module/primitive/ModalProfile.vue";
import List from "~/molle-cms/src/module/primitive/List.vue";
import ListProfile from "~/molle-cms/src/module/primitive/ListProfile.vue";
import ListBox from "~/molle-cms/src/module/primitive/ListBox.vue";
import ListBoxProfile from "~/molle-cms/src/module/primitive/ListBoxProfile.vue";
import Gallery from "~/molle-cms/src/module/custom/Gallery.vue";
import GalleryProfile from "~/molle-cms/src/module/custom/GalleryProfile.vue";
import GoogleForm from "~/molle-cms/src/module/custom/GoogleForm.vue";
import GoogleFormProfile from "~/molle-cms/src/module/custom/GoogleFormProfile.vue";
import SocialShare from "~/molle-cms/src/module/custom/SocialShare.vue";
import SocialShareProfile from "~/molle-cms/src/module/custom/SocialShareProfile.vue";
import Card from "~/molle-cms/src/module/custom/Card.vue";
import CardProfile from "~/molle-cms/src/module/custom/CardProfile.vue";
import GoogleMap from "~/molle-cms/src/module/custom/GoogleMap.vue";
import GoogleMapProfile from "~/molle-cms/src/module/custom/GoogleMapProfile.vue";
import AnchorNavi from "~/molle-cms/src/module/custom/AnchorNavi.vue";
import AnchorNaviProfile from "~/molle-cms/src/module/custom/AnchorNaviProfile.vue";
import HorizonCard from "~/molle-cms/src/module/custom/HorizonCard.vue";
import HorizonCardProfile from "~/molle-cms/src/module/custom/HorizonCardProfile.vue";
import DataBox from "~/molle-cms/src/module/primitive/DataBox.vue";
import DataBoxProfile from "~/molle-cms/src/module/primitive/DataBoxProfile.vue";
import DataSet from "~/molle-cms/src/module/primitive/DataSet.vue";
import DataSetProfile from "~/molle-cms/src/module/primitive/DataSetProfile.vue";
import Reference from "~/molle-cms/src/module/primitive/Reference.vue";
import ReferenceProfile from "~/molle-cms/src/module/primitive/ReferenceProfile.vue";
import Table from "~/molle-cms/src/module/primitive/Table.vue";
import TableProfile from "~/molle-cms/src/module/primitive/TableProfile.vue";
/* > */
import {Vue} from "nuxt-property-decorator";
import ModuleLoaderCms from "~/molle-cms/src/module/ModuleLoaderCms.vue";
import AddModuleComp from "~/molle-cms/src/ui/AddModuleComp.vue";
import ItemListItemComp from "~/molle-cms/src/ui/ItemListItemComp.vue";
import MolleEditerComp from "~/molle-cms/src/ui/MolleEditerComp.vue";
import {Singleton} from "../../../molle-cms/src/Singleton";

Vue.component("MolleEditerComp", MolleEditerComp);
Vue.component("AddModuleComp", AddModuleComp);
Vue.component("ItemListItemComp", ItemListItemComp);
Vue.component("ModuleLoader", ModuleLoaderCms);

declare module "vue/types/vue" {
  interface Vue {
    // @ts-ignore
    $molleModules: {
      [key: string]: {
        ref: any;
        profile?: any;
        def: any;// todo TBD
        getItemData: () => any;
        convert?: any[];
        black?: any[];
        white?: any[];
        icon?: string;//puzzle
      };
    }
    // @ts-ignore
    $molleModuleList: {
      ref: any;
      profile?: any;
      def: any;// todo TBD
      getItemData: () => any;
      convert?: any[];
      black?: any[];
      white?: any[];
      icon?: string;//puzzle
    }[];
  }
}

// modules
let _molleModules: any = {};
let _molleModuleList: any[] = [];
[{
  ref: Box,
  profile: BoxProfile,
}, {
  ref: Section,
  profile: SectionProfile,
}, {
  ref: BackgroundBox,
  profile: BackgroundBoxProfile,
}, {
  ref: LinkBox,
  profile: LinkBoxProfile,
}, {
  ref: IsviewBox,
  profile: IsviewBoxProfile,
}, {
  ref: Headline,
  profile: HeadlineProfile,
}, {
  ref: Paragraph,
  profile: ParagraphProfile,
}, {
  ref: Picture,
  profile: PictureProfile,
}, {
  ref: Button,
  profile: ButtonProfile,
}, {
  ref: ButtonList,
  profile: ButtonListProfile,
}, {
  ref: AnchorNavi,
  profile: AnchorNaviProfile,
}, {
  ref: Column,
  profile: ColumnProfile,
}, {
  ref: ColumnBox,
  profile: ColumnBoxProfile,
}, {
  ref: Table,
  profile: TableProfile,
}, {
  ref: Embed,
  profile: EmbedProfile,
}, {
  ref: Modal,
  profile: ModalProfile,
}, {
  ref: Gallery,
  profile: GalleryProfile,
}, {
  ref: GoogleForm,
  profile: GoogleFormProfile,
}, {
  ref: GoogleMap,
  profile: GoogleMapProfile,
}, {
  ref: SocialShare,
  profile: SocialShareProfile,
}, {
  ref: Card,
  profile: CardProfile,
}, {
  ref: HorizonCard,
  profile: HorizonCardProfile,
}, {
  ref: DevModuleGuide,
  profile: DevModuleGuideProfile,
}, {
  ref: List,
  profile: ListProfile,
}, {
  ref: ListBox,
  profile: ListBoxProfile,
}, {
  ref: DataBox,
  profile: DataBoxProfile,
}, {
  ref: DataSet,
  profile: DataSetProfile,
}, {
  ref: Reference,
  profile: ReferenceProfile,
},
].forEach((attr: {ref: any; profile?: any;}) => {
  let v: any = {
    moduleId: attr.ref.CLASS_NAME,
    type: attr.profile.settings.type,
    tagId: "",
    tagClass: "",
    style: {},
    class: {},
    option: {},
    createTime: firebase.firestore.FieldValue.serverTimestamp(),
  };
  switch (attr.profile.settings.type) {
    case "children":
      v.value = [];
      break;
    case "any":
      v.value = {};
      break;
    case "group":
      v.value = {};
      break;
    case "picture":
      v.value = "https://placehold.jp/400x300.png";
      break;
    case "text":
      v.value = "Lorem ipsum...";
      break;
    case "button":
      v.value = "BUTTON";
      break;
  }
  if (attr.profile.settings.opt) {
    for (let key in attr.profile.settings.opt) {
      v[key] = attr.profile.settings.opt[key];
    }
  }
  _molleModules[attr.ref.CLASS_NAME] = {
    ref: attr.ref,
    profile: attr.profile,
    black: attr.profile.settings.black,
    white: attr.profile.settings.white,
    convert: attr.profile.settings.convert,
    icon: attr.profile.settings.icon,
    def: v,// todo TBD
    getItemData: () => JSON.parse(JSON.stringify(v)),
  };
  _molleModuleList.push(_molleModules[attr.ref.CLASS_NAME]);

  Vue.component(attr.ref.CLASS_NAME, attr.ref);
  if (attr.profile) {
    Vue.component(attr.profile.CLASS_NAME, attr.profile);
  }
});

Vue.prototype.$molleModules = _molleModules;
Vue.prototype.$molleModuleList = _molleModuleList;

//

let datalist = <{id: string, value: string}[]>[];
Singleton.systemDocRef
  .onSnapshot((snap: firebase.firestore.DocumentSnapshot) => {
    let siteData: any = snap.data();
    datalist = siteData.datalist || [];
  });
Vue.prototype.$getText = (str: string) => {
  for (let item of datalist) {
    if (!str.includes("${")) break;
    str = str.replace(new RegExp("\\${" + item.id + "}", "g"), item.value);
  }
  return str;
};
