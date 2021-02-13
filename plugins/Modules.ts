import {Vue} from "~/node_modules/nuxt-property-decorator";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import ItemListItemComp from "~/molle/ui/ItemListItemComp.vue";
import {molleModules} from "~/molle/module";
import firebase from "~/node_modules/firebase";

// firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  });
  // firebase.analytics();
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
