import firebase from "firebase";
/* <imports */
import Box from "~/molle/module/primitive/Box.vue";
import BoxProfile from "~/molle/module/primitive/BoxProfile.vue";
import BackgroundBox from "~/molle/module/primitive/BackgroundBox.vue";
import BackgroundBoxProfile from "~/molle/module/primitive/BackgroundBoxProfile.vue";
import Headline from "~/molle/module/primitive/Headline.vue";
import HeadlineProfile from "~/molle/module/primitive/HeadlineProfile.vue";
import PositionHeadline from "~/molle/module/primitive/PositionHeadline.vue";
import PositionHeadlineProfile from "~/molle/module/primitive/PositionHeadlineProfile.vue";
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
import ButtonList from "~/molle/module/primitive/ButtonList.vue";
import ButtonListProfile from "~/molle/module/primitive/ButtonListProfile.vue";
import FadeInOutPictureBox from "~/molle/module/primitive/FadeInOutPictureBox.vue";
import FadeInOutPictureBoxProfile from "~/molle/module/primitive/FadeInOutPictureBoxProfile.vue";
import LinkPicture from "~/molle/module/primitive/LinkPicture.vue";
import LinkPictureProfile from "~/molle/module/primitive/LinkPictureProfile.vue";
import TextOnPictureBox from "~/molle/module/primitive/TextOnPictureBox.vue";
import TextOnPictureBoxProfile from "~/molle/module/primitive/TextOnPictureBoxProfile.vue";
import TextByPictureBox from "~/molle/module/primitive/TextByPictureBox.vue";
import TextByPictureBoxProfile from "~/molle/module/primitive/TextByPictureBoxProfile.vue";
import TextBox from "~/molle/module/primitive/TextBox.vue";
import TextBoxProfile from "~/molle/module/primitive/TextBoxProfile.vue";
import OverlapBox from "~/molle/module/custom/OverlapBox.vue";
import OverlapBoxProfile from "~/molle/module/custom/OverlapBoxProfile.vue";
import BesideCard from "~/molle/module/custom/BesideCard.vue";
import BesideCardProfile from "~/molle/module/custom/BesideCardProfile.vue";
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
import Table from "~/molle/module/primitive/Table.vue";
import TableProfile from "~/molle/module/primitive/TableProfile.vue";
/* > */

import {Vue} from "nuxt-property-decorator";
import ModuleLoaderCms from "molle-cms/src/module/ModuleLoaderCms.vue";
import AddModuleComp from "molle-cms/src/ui/AddModuleComp.vue";
import ItemListItemComp from "molle-cms/src/ui/ItemListItemComp.vue";

declare module "vue/types/vue" {
  interface Vue {
    // @ts-ignore
    $molleModules: {
      [key: string]: {
        ref: any;
        profile?: any;
        profileName?: string;
        def: any;
        convert?: string[];
        black?: string[];
        white?: string[];
        icon?: string;//puzzle
      };
    }
  }
}
const molleModules = Vue.prototype.$molleModules = {
  Box: {
    ref: Box,
    profile: BoxProfile,
    profileName: "BoxProfile",
    def: c("Box", "children"),
    black: ["ColumnBox", "PositionHeadline"],
    convert: ["ColumnBox", "BackgroundBox"],
    icon: "plus-square",
  },
  BackgroundBox: {
    ref: BackgroundBox,
    profile: BackgroundBoxProfile,
    profileName: "BackgroundBoxProfile",
    def: c("BackgroundBox", "children"),
    black: ["ColumnBox"],
    convert: ["Box", "ColumnBox"],
    icon: "plus-square",
  },
  Headline: {
    ref: Headline,
    profile: HeadlineProfile,
    profileName: "HeadlineProfile",
    def: c("Headline", "text", {
      option: {
        lv: "h3",
      },
    }),
    convert: ["Paragraph"],
    icon: "card-heading",
  },
  PositionHeadline: {
    ref: PositionHeadline,
    profile: PositionHeadlineProfile,
    profileName: "PositionHeadlineProfile",
    def: c("PositionHeadline", "text", {
      option: {
        lv: "h1",
      },
    }),
    icon: "card-heading",
  },
  Paragraph: {
    ref: Paragraph,
    profile: ParagraphProfile,
    profileName: "ParagraphProfile",
    def: c("Paragraph", "text"),
    convert: ["Headline"],
    icon: "text-paragraph",
  },
  Picture: {
    ref: Picture,
    profile: PictureProfile,
    profileName: "PictureProfile",
    def: c("Picture", "picture", {
      option: {
        sp: "",
        alt: "",
      },
    }),
    convert: ["LinkPicture"],
    icon: "image",
  },
  LinkPicture: {
    ref: LinkPicture,
    profile: LinkPictureProfile,
    profileName: "LinkPictureProfile",
    def: c("LinkPicture", "picture", {
      option: {
        sp: "",
        alt: "",
      },
    }),
    convert: ["Picture"],
    icon: "image",
  },
  Button: {
    ref: Button,
    profile: ButtonProfile,
    profileName: "ButtonProfile",
    def: c("Button", "button", {
      option: {
        href: "https://placehold.jp/",
        target: "",
      },
    }),
    icon: "hand-index",
  },
  // Card: {
  //   ref: Card,
  //   profile: CardProfile,
  //   def: c("Card", "group")
  // },
  //
  Column: {
    ref: Column,
    profile: ColumnProfile,
    profileName: "ColumnProfile",
    def: c("Column", "children"),
    white: ["ColumnBox", "Box"],
    icon: "layout-three-columns",
  },
  ColumnBox: {
    ref: ColumnBox,
    profile: ColumnBoxProfile,
    profileName: "ColumnBoxProfile",
    def: c("ColumnBox", "children"),
    black: ["ColumnBox"],
    convert: ["Box"],
    icon: "plus-square",
  },
  ButtonList: {
    ref: ButtonList,
    profile: ButtonListProfile,
    profileName: "ButtonListProfile",
    def: c("ButtonList", "children"),
    white: ["Button"],
    icon: "layout-three-columns",
  },
  FadeInOutPictureBox: {
    ref: FadeInOutPictureBox,
    profile: FadeInOutPictureBoxProfile,
    profileName: "FadeInOutPictureBoxProfile",
    def: c("FadeInOutPictureBox", "group", {
      value: {
        img1: {fixedModuleId: "Picture", order: 0},
        img2: {fixedModuleId: "Picture", order: 10},
        img3: {fixedModuleId: "Picture", order: 20},
        headline: {fixedModuleId: "PositionHeadline", order: 30},
      },
    }),
    icon: "plus-square",
  },
  TextOnPictureBox: {
    ref: TextOnPictureBox,
    profile: TextOnPictureBoxProfile,
    profileName: "TextOnPictureBoxProfile",
    def: c("TextOnPictureBox", "group", {
      value: {
        img: {fixedModuleId: "Picture", order: 0},
        textBox: {fixedModuleId: "TextBox", order: 10},
      },
    }),
    icon: "plus-square",
  },
  TextByPictureBox: {
    ref: TextByPictureBox,
    profile: TextByPictureBoxProfile,
    profileName: "TextByPictureBoxProfile",
    def: c("TextByPictureBox", "group", {
      value: {
        img: {fixedModuleId: "Picture", order: 0},
        textBox: {fixedModuleId: "TextBox", order: 10},
      },
    }),
    icon: "plus-square",
  },
  TextBox: {
    ref: TextBox,
    profile: TextBoxProfile,
    profileName: "TextBoxProfile",
    def: c("TextBox", "children"),
    white: ["Headline", "Paragraph", "Button"],
    icon: "plus-square",
  },
  Table: {
    ref: Table,
    profile: TableProfile,
    profileName: "TableProfile",
    def: c("Table", "text", {
      value: "th,aaa\nth,bbb",
      option: {columnHeading: true},
    }),
    icon: "table",
  },
  Modal: {
    ref: Modal,
    profile: ModalProfile,
    profileName: "ModalProfile",
    def: c("Modal", "children"),
    // black: ["ColumnBox"],
    // convert: ["ColumnBox"],
    icon: "pip",
  },

  //custom
  Gallery: {
    ref: Gallery,
    profile: GalleryProfile,
    profileName: "GalleryProfile",
    def: c("Gallery", "children"),
    white: ["Picture"],
    icon: "three-dots",
  },
  GoogleForm: {
    ref: GoogleForm,
    profile: GoogleFormProfile,
    profileName: "GoogleFormProfile",
    def: c("GoogleForm", "any"),
    icon: "ui-radios",
  },
  GoogleMap: {
    ref: GoogleMap,
    profile: GoogleMapProfile,
    profileName: "GoogleMapProfile",
    def: c("GoogleMap", "any"),
    icon: "geo-alt",
  },
  SocialShare: {
    ref: SocialShare,
    profile: SocialShareProfile,
    profileName: "SocialShareProfile",
    def: c("SocialShare", "any"),
    icon: "share",
  },
  //
  Card: {
    ref: Card,
    profile: CardProfile,
    profileName: "CardProfile",
    def: c("Card", "group", {
      value: {
        img: {fixedModuleId: "Picture", order: 0},
        headline: {fixedModuleId: "Paragraph", order: 10},
        text: {fixedModuleId: "Paragraph", order: 20},
      },
    }),
    icon: "file-richtext",
  },
  OverlapBox: {
    ref: OverlapBox,
    profile: OverlapBoxProfile,
    profileName: "OverlapBoxProfile",
    def: c("OverlapBox", "group", {
      value: {
        headline: {fixedModuleId: "Headline", order: 0},
        text: {fixedModuleId: "Paragraph", order: 10},
        btn: {fixedModuleId: "Button", order: 20},
        img: {fixedModuleId: "Picture", order: 30},
      },
    }),
    icon: "file-richtext",
  },
  BesideCard: {
    ref: BesideCard,
    profile: BesideCardProfile,
    profileName: "BesideCardProfile",
    def: c("BesideCard", "group", {
      value: {
        headline: {fixedModuleId: "Headline", order: 0},
        text: {fixedModuleId: "Paragraph", order: 10},
        btn: {fixedModuleId: "Button", order: 20},
        img: {fixedModuleId: "Picture", order: 30},
      },
    }),
    icon: "file-richtext",
  },
};
// export type molleModules = typeof molleModules[keyof typeof molleModules];

Vue.component("AddModuleComp", AddModuleComp);
Vue.component("ItemListItemComp", ItemListItemComp);
Vue.component("ModuleLoader", ModuleLoaderCms);
//modules
for (let key in molleModules) {
  // @ts-ignore
  Vue.component(key, molleModules[key].ref);
  // @ts-ignore
  if (molleModules[key].profile) {
    // @ts-ignore
    Vue.component(molleModules[key].profileName, molleModules[key].profile);
  }
}


/**
 * Create InitialValue
 * @param moduleId
 * @param type
 * @param opt
 */
function c(moduleId: string, type: string, opt?: any) {
  let v: any = {
    moduleId: moduleId,
    type: type,
    tagId: "",
    tagClass: "",
    style: {},
    class: {},
    option: {},
    createTime: firebase.firestore.FieldValue.serverTimestamp(),
    // updateTime: firebase.firestore.FieldValue.serverTimestamp(),
  };
  switch (type) {
    case "children":
      v.value = [];
      break;
    // case "items":
    //   v.value = [];
    //   break;
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
  if (opt) {
    for (let key in opt) {
      v[key] = opt[key];
    }
  }
  return v;
}
