import {Vue} from "~/node_modules/nuxt-property-decorator";
import ModuleLoader from "~/molle/module/ModuleLoader.vue";
import ItemListItemComp from "~/molle/ui/ItemListItemComp.vue";
import firebase from "~/node_modules/firebase";
import VueScrollTo from 'vue-scrollto';
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

// cms ui
Vue.component("ItemListItemComp", ItemListItemComp);


Vue.use(VueScrollTo, {
  duration: 600,
  offset: 0,
  easing: [0.25, 0.0, 0.4, 1.0]
});

import "./_isview";
