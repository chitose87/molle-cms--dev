import {Vue} from "~/node_modules/nuxt-property-decorator";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import ItemListItemComp from "~/molle/ui/ItemListItemComp.vue";
import {molleModules} from "~/molle/module";
import firebase from "~/node_modules/firebase";
import VueScrollTo from 'vue-scrollto';

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

Vue.use(VueScrollTo, {
  duration: 600,
  offset: 0,
  easing: [0.25, 0.0, 0.4, 1.0]
});

// isview

Vue.directive('isview', {
  inserted: function (el: HTMLElement, binding, vnode: any) {
    //const padding = 100;
    let range = 1;
    let target: any = [el];
    let className = "";
    let attr: any;
    let status = "outview";

    if (typeof binding.value == "string") {
      className = binding.value;
    } else if (binding.value) {
      className = binding.value.class;
      attr = Object.assign({}, binding.value);
      delete attr.class;
      if (attr.range) range = attr.range;
      if (attr.target) target = el.querySelectorAll(attr.target);
    }

    let handler = () => {
      if (el.dataset.isviewUnbind) {
        window.removeEventListener('scroll', handler);
        return;
      }

      let rect = el.getBoundingClientRect();
      let padding = innerHeight * (1 - range) / 2;

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
        if (binding.modifiers["animation-delay"]) {
          if (!isLoop) {
            isLoop = true;
            loop();
          }
        }
        el.setAttribute("data-isview", status);
        if (vnode.componentInstance) vnode.componentInstance.$emit("inview");
        else el.dispatchEvent(new Event("inview"))
      }
      // console.log(binding.value, binding.modifiers)
    };
    // loop
    let isLoop = false;
    let loop = () => {
      let rate = (el.getBoundingClientRect().top + el.offsetHeight / 2) / (window.outerHeight / 2);
      rate=Math.min(rate,2);
      rate=Math.max(rate,0)*-1;
      target.forEach((item: HTMLElement) => {
        item.setAttribute("style", `animation-delay:${rate}s`);
      });
      if (isLoop) requestAnimationFrame(loop);
    };
    // remove
    let remove = () => {
      isLoop = false;
      if (className) {
        el.classList.remove(className);
      }
      if (attr) {
        for (let key in attr) {
          el.removeAttribute(key);
        }
      }
      if (vnode.componentInstance) vnode.componentInstance.$emit("outview");
      else el.dispatchEvent(new Event("outview"))
      el.setAttribute("data-isview", status);
    };
    window.addEventListener('scroll', handler);
    handler();
  },
  unbind: function (el: any) {
    el.dataset.isviewUnbind = true;
  }
});
