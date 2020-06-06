require('dotenv').config();

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
});

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/Modules.ts',
    // {src: "~/plugins/index.ts", ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt',
    // {css: false},
    '@nuxtjs/style-resources',
  ],
  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false // or `bvCSS`
    , icons: true
  },
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    filenames: {
      app: ({isDev}) => true ? '[name]-app.js?[hash]' : '[contenthash].js',
      chunk: ({isDev}) => true ? '[name].js?[hash]' : '[contenthash].js',
      css: ({isDev}) => true ? '[name].css?[hash]' : '[contenthash].css',
      img: ({isDev}) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({isDev}) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({isDev}) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    extend(config, ctx) {
    }
  },
  generate: {
    // subFolders: false,
    routes() {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {

          // let pages = firebase.firestore().collection("pages").get();
          // let outlines = firebase.firestore().collection("outlines").get();
          // let items = firebase.firestore().collectionGroup("items").get();
          // let values = firebase.firestore().collectionGroup("values").get();
          // let styles = firebase.firestore().collectionGroup("styles").get();
          // Promise.all([pages, outlines, items, values, styles])
          //   .then(([pages, outlines, items, values, styles]) => {
          //
          //     let allData = {
          //       pages: {}, outlines: {}, items: {}, values: {}, styles: {}
          //     };
          //     let list = [];
          //
          //     pages.forEach((snap) => {
          //       let data = snap.data();
          //       allData.pages[snap.id] = data;
          //       list.push({
          //         route: `${data.path}`
          //         , payload: {id: snap.id, allData: allData}
          //       })
          //     });
          //     outlines.forEach((snap) => {
          //       allData.outlines[snap.id] = snap.data()
          //     });
          //     items.forEach((snap) => {
          //       allData.items[snap.id] = snap.data()
          //     });
          //     values.forEach((snap) => {
          //       allData.values[snap.id] = snap.data()
          //     });
          //     styles.forEach((snap) => {
          //       allData.styles[snap.id] = snap.data()
          //     });
          //
          //     // console.log(allData);
          //     resolve(list);
          //   });

          firebase.firestore().collection("pages")
            .get()
            .then((querySnapshot) => {
              let list = [];
              querySnapshot.forEach((doc) => {
                let data = doc.data();
                console.log(data.path);
                list.push({
                  route: `${data.path}`
                  , payload: data
                })
              });
              resolve(list);
            })
        });
      });
    }
  }
}
