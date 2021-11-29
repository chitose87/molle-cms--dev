import {Vue} from "nuxt-property-decorator";
import firebase from "firebase";
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

Vue.use(VueScrollTo, {
  duration: 600,
  offset: -100,
  easing: [0.25, 0.0, 0.4, 1.0]
});

import "./_isview";
