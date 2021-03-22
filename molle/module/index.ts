import firebase from "firebase";
import Box from "~/molle/module/primitive/Box.vue";
import BoxProfile from "~/molle/module/primitive/BoxProfile.vue";
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
import Table from "~/molle/module/primitive/Table.vue";
import TableProfile from "~/molle/module/primitive/TableProfile.vue";

export const molleModules: {
  [key: string]: {
    ref: any;
    profile?: any;
    profileName?: string;
    def: any;
    convert?: string[];
    black?: string[];
    white?: string[];
  };
} = {
  Box: {
    ref: Box,
    profile: BoxProfile,
    profileName: "BoxProfile",
    def: c("Box", "children"),
    black: ["ColumnBox"],
    convert: ["ColumnBox"],
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
  },
  Paragraph: {
    ref: Paragraph,
    profile: ParagraphProfile,
    profileName: "ParagraphProfile",
    def: c("Paragraph", "text"),
    convert: ["Headline"],
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
  },
  ColumnBox: {
    ref: ColumnBox,
    profile: ColumnBoxProfile,
    profileName: "ColumnBoxProfile",
    def: c("ColumnBox", "children"),
    black: ["ColumnBox"],
    convert: ["Box"],
  },
  Table: {
    ref: Table,
    profile: TableProfile,
    profileName: "TableProfile",
    def: c("Table", "text", {
      value: "th,aaa\nth,bbb",
      option: {columnHeading: true},
    }),
  },
  Modal: {
    ref: Modal,
    profile: ModalProfile,
    profileName: "ModalProfile",
    def: c("Modal", "children"),
    // black: ["ColumnBox"],
    // convert: ["ColumnBox"],
  },

  //custom
  Gallery: {
    ref: Gallery,
    profile: GalleryProfile,
    profileName: "GalleryProfile",
    def: c("Gallery", "children"),
    white: ["Picture"],
  },
  GoogleForm: {
    ref: GoogleForm,
    profile: GoogleFormProfile,
    profileName: "GoogleFormProfile",
    def: c("GoogleForm", "any"),
  },
  GoogleMap: {
    ref: GoogleMap,
    profile: GoogleMapProfile,
    profileName: "GoogleMapProfile",
    def: c("GoogleMap", "any"),
  },
  SocialShare: {
    ref: SocialShare,
    profile: SocialShareProfile,
    profileName: "SocialShareProfile",
    def: c("SocialShare", "any"),
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
      }
    }),
  },
};
export type molleModules = typeof molleModules[keyof typeof molleModules];

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
    updateTime: firebase.firestore.FieldValue.serverTimestamp(),
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
