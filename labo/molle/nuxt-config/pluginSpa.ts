import firebase from "firebase";

import DevModuleGuide from "~/molle-cms/src/module/custom/DevModuleGuide.vue";
import DevModuleGuideProfile from "~/molle-cms/src/module/custom/DevModuleGuideProfile.vue";
/* <imports */
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
import RandomCards from "~/molle/module/custom/RandomCards.vue";
import RandomCardsProfile from "~/molle/module/custom/RandomCardsProfile.vue";
import RandomCardBox from "~/molle/module/custom/RandomCardBox.vue";
import RandomCardBoxProfile from "~/molle/module/custom/RandomCardBoxProfile.vue";
import LabelCard from "~/molle/module/custom/LabelCard.vue";
import LabelCardProfile from "~/molle/module/custom/LabelCardProfile.vue";
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
import Table from "~/molle-cms/src/module/primitive/Table.vue";
import TableProfile from "~/molle-cms/src/module/primitive/TableProfile.vue";
/* > */
import {Vue} from "nuxt-property-decorator";
import ModuleLoaderCms from "~/molle-cms/src/module/ModuleLoaderCms.vue";
import AddModuleComp from "~/molle-cms/src/ui/AddModuleComp.vue";
import ItemListItemComp from "~/molle-cms/src/ui/ItemListItemComp.vue";
import MolleEditerComp from "~/molle-cms/src/ui/MolleEditerComp.vue";

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
        def: any;
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
      def: any;
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
  ref: Embed,
  profile: EmbedProfile,
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
  ref: Column,
  profile: ColumnProfile,
}, {
  ref: ColumnBox,
  profile: ColumnBoxProfile,
}, {
  ref: Table,
  profile: TableProfile,
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
  ref: RandomCardBox,
  profile: RandomCardBoxProfile,
}, {
  ref: RandomCards,
  profile: RandomCardsProfile,
}, {
  ref: Card,
  profile: CardProfile,
}, {
  ref: LabelCard,
  profile: LabelCardProfile,
},{
  ref: DevModuleGuide,
  profile: DevModuleGuideProfile,
},
].forEach((attr: {ref: any; profile?: any;}) => {
  let v: any = {
    moduleId: attr.ref.name,
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
  _molleModules[attr.ref.name] = {
    ref: attr.ref,
    profile: attr.profile,
    black: attr.profile.settings.black,
    white: attr.profile.settings.white,
    convert: attr.profile.settings.convert,
    icon: attr.profile.settings.icon,
    def: v,
  };
  _molleModuleList.push(_molleModules[attr.ref.name]);

  Vue.component(attr.ref.name, attr.ref);
  if (attr.profile) {
    Vue.component(attr.profile.name, attr.profile);
  }
});

Vue.prototype.$molleModules = _molleModules;
Vue.prototype.$molleModuleList = _molleModuleList;
