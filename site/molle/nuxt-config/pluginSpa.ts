import firebase from "firebase";
/* <imports */
import Box from "~/molle/module/primitive/Box.vue";
import BoxProfile from "~/molle/module/primitive/BoxProfile.vue";
import BackgroundBox from "~/molle/module/primitive/BackgroundBox.vue";
import BackgroundBoxProfile from "~/molle/module/primitive/BackgroundBoxProfile.vue";
import Headline from "~/molle/module/primitive/Headline.vue";
import HeadlineProfile from "~/molle/module/primitive/HeadlineProfile.vue";
import Paragraph from "~/molle/module/primitive/Paragraph.vue";
import ParagraphProfile from "~/molle/module/primitive/ParagraphProfile.vue";
import Picture from "~/molle/module/primitive/Picture.vue";
import PictureProfile from "~/molle/module/primitive/PictureProfile.vue";
import Button from "~/molle/module/primitive/Button.vue";
import ButtonProfile from "~/molle/module/primitive/ButtonProfile.vue";
import Column from "~/molle/module/primitive/Column.vue";
import ColumnProfile from "~/molle/module/primitive/ColumnProfile.vue";
import ColumnBox from "~/molle/module/primitive/ColumnBox.vue";
import ColumnBoxProfile from "~/molle/module/primitive/ColumnBoxProfile.vue";
import Gallery from "~/molle/module/custom/Gallery.vue";
import GalleryProfile from "~/molle/module/custom/GalleryProfile.vue";
import GoogleForm from "~/molle/module/custom/GoogleForm.vue";
import GoogleFormProfile from "~/molle/module/custom/GoogleFormProfile.vue";
import ModalProfile from "~/molle/module/primitive/ModalProfile.vue";
import SocialShare from "~/molle/module/custom/SocialShare.vue";
import SocialShareProfile from "~/molle/module/custom/SocialShareProfile.vue";
import Modal from "~/molle/module/primitive/Modal.vue";
import Card from "~/molle/module/custom/Card.vue";
import CardProfile from "~/molle/module/custom/CardProfile.vue";
import GoogleMap from "~/molle/module/custom/GoogleMap.vue";
import GoogleMapProfile from "~/molle/module/custom/GoogleMapProfile.vue";
import Embed from "~/molle/module/primitive/Embed.vue";
import EmbedProfile from "~/molle/module/primitive/EmbedProfile.vue";
import Table from "~/molle/module/primitive/Table.vue";
import TableProfile from "~/molle/module/primitive/TableProfile.vue";

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
  ref: Card,
  profile: CardProfile,
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
