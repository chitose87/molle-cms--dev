import {Vue} from "~/node_modules/nuxt-property-decorator";
import Box from "~/src/module/primitive/Box.vue";
import ModuleLoader from "~/src/module/ModuleLoader.vue";
import Paragraph from "~/src/module/primitive/Paragraph.vue";
import firebase from "firebase";
import ItemListItemComp from "~/src/ui/ItemListItemComp.vue";
import BoxProfile from "~/src/module/primitive/BoxProfile.vue";
import ParagraphProfile from "~/src/module/primitive/ParagraphProfile.vue";

export const molleModules: {
  [key: string]: {
    ref: any,
    profile: any,
    profileName: string,
    def: any,
    black?: [any],
    white?: [any],
  }
} = {
  Box: {
    ref: Box,
    profile: BoxProfile,
    profileName: "BoxProfile",
    def: c("Box", "children"),
    // black: [ColumnBox]
  },
  // Headline: {
  //   ref: Headline,
  //   profile: HeadlineProfile,
  //   def: c("Headline", "text", {
  //     option: {
  //       lv: "h3"
  //     }
  //   })
  // },
  Paragraph: {
    ref: Paragraph,
    profile: ParagraphProfile,
    profileName: "ParagraphProfile",
    def: c("Paragraph", "text")
  },
  // Picture: {
  //   ref: Picture,
  //   profile: PictureProfile,
  //   def: c("Picture", "picture")
  // },
  //
  // Card: {
  //   ref: Card,
  //   profile: CardProfile,
  //   def: c("Card", "group")
  // },
  //
  // Column: {
  //   ref: Column,
  //   profile: ColumnProfile,
  //   def: c("Column", "children"),
  //   white: [ColumnBox]
  // },
  // ColumnBox: {
  //   ref: ColumnBox,
  //   profile: ColumnBoxProfile,
  //   def: c("ColumnBox", "children"),
  //   black: [ColumnBox]
  // }
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
    createTime: firebase.firestore.FieldValue.serverTimestamp()
  };
  switch (type) {
    case "children":
      v.value = [];
      break;
    // case "items":
    //   v.value = [];
    //   break;
    case "group":
      v.value = {};
      break;
    case "picture":
      v.value = {src: "https://placehold.jp/150x150.png"};
      break;
    case "text":
      v.value = "Lorem ipsum...";
      break;
    case "button":
      v.value = {
        href: "https://placehold.jp/",
        label: "BUTTON",
      };
      break;
  }
  if (opt) {
    for (let key in opt) {
      v[key] = opt[key];
    }
  }
  return v;
}

// Setting Vue Molle-Module

Vue.component("ModuleLoader", ModuleLoader);
Vue.component("ItemListItemComp", ItemListItemComp);
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

// isview

Vue.directive('isview', {
  inserted: function (el: HTMLElement, binding, vnode: any) {
    const padding = 100;
    let className = "";
    let attr: any;
    let status = "outview";

    if (typeof binding.value == "string") {
      className = binding.value;
    } else if (binding.value) {
      className = binding.value.class;
      attr = Object.assign({}, binding.value);
      delete attr.class;
    }

    let handler = () => {
      if (el.dataset.isviewUnbind) {
        window.removeEventListener('scroll', handler);
        return;
      }

      let rect = el.getBoundingClientRect();

      if (rect.top + el.offsetHeight <= padding) {
        // hidden 上
        status = "outview--on";
        remove();
      } else if (rect.top >= window.outerHeight - padding) {
        // hidden 下
        status = "outview--under";
        remove();
      } else {
        // visible
        status = "inview";
        if (className) {
          el.classList.add(className);
        }
        if (attr) {
          for (let key in attr) {
            el.setAttribute(key, attr[key]);
          }
        }
        if (binding.modifiers.once) {
          window.removeEventListener('scroll', handler);
        }
        vnode.context.$emit("inview");
        el.setAttribute("data-isview", status);
      }
      // console.log(binding.value, binding.modifiers)
    };
    let remove = () => {
      if (className) {
        el.classList.remove(className);
      }
      if (attr) {
        for (let key in attr) {
          el.removeAttribute(key);
        }
      }
      vnode.context.$emit("outview");
      el.setAttribute("data-isview", status);
    };
    window.addEventListener('scroll', handler);
    handler();
  },
  unbind: function (el: any) {
    el.dataset.isviewUnbind = true;
  }
});
