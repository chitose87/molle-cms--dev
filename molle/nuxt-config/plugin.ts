import {Vue} from "~/node_modules/nuxt-property-decorator";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import ItemListItemComp from "~/molle/ui/ItemListItemComp.vue";
import {molleModules} from "~/molle/module";
import firebase from "~/node_modules/firebase";
import VueScrollTo from 'vue-scrollto';
import PageTitle from "~/components/PageTitle.vue";
import GlobalFooterComp from "~/components/GlobalFooterComp.vue";
import Headline from "~/molle/module/primitive/Headline.vue";
import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";

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

Vue.component("GlobalHeaderComp", GlobalHeaderComp);
// delete with static mode
Vue.component("ModuleLoader", ModuleLoader);
Vue.component("GlobalFooterComp", GlobalFooterComp);
Vue.component("PageTitle", PageTitle);

// cms ui
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

import "./_isview";
