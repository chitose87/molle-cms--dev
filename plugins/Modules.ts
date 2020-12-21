import {Vue} from "~/node_modules/nuxt-property-decorator";
import Box from "~/src/module/primitive/Box.vue";
import ModuleLoader from "~/src/module/ModuleLoader.vue";
import Paragraph from "~/src/module/primitive/Paragraph.vue";

export const molleModules: {
  [key: string]: {
    ref: any,
    // profile: any,
    // def: any,
    // black?: [any],
    // white?: [any],
  }
} = {
  Box: {
    ref: Box,
    // profile: BoxProfile,
    // def: c("Box", "children"),
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
  //   profile: ParagraphProfile,
  //   def: c("Paragraph", "text")
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

Vue.component("ModuleLoader", ModuleLoader);
//modules
for (let key in molleModules) {
  // @ts-ignore
  Vue.component(key, molleModules[key].ref);
  // @ts-ignore
  if (molleModules[key].profile) {
    // @ts-ignore
    Vue.component(molleModules[key].profile.options.name, molleModules[key].profile);
  }
}

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
