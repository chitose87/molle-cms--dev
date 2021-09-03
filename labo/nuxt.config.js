const SITE_DIR = process.argv[3];
require('dotenv').config();

const molle = require("./molle.json");
molle.version = "0.8";
molle.isMolleCms = process.env.IS_MOLLE_CMS == "true";
molle.apiKey = process.env.apiKey;
molle.authDomain = process.env.authDomain;
molle.databaseURL = process.env.databaseURL;
molle.projectId = process.env.projectId;
molle.storageBucket = process.env.storageBucket;
molle.messagingSenderId = process.env.messagingSenderId;
molle.appId = process.env.appId;
molle.measurementId = process.env.measurementId;

const scssEnv = {
  breakPoint: molle.breakPoint,
  gutter: molle.gutter,
  version: molle.version,
}
let envStr = "";
for (let i in scssEnv) {
  envStr += `$${i}:${scssEnv[i]};`;
}

const css = [
  './assets/scss/app.scss'
]
const modules = [
  '@nuxtjs/dotenv',
  '@nuxtjs/style-resources',
  '../molle-cms/generateHooks'
]
const plugins = [
  './molle/nuxt-config/plugin.ts'
]
const scriptObj = [];
if (molle.isMolleCms) {
  css.push('molle-cms/css/molle.scss')
  modules.push('bootstrap-vue/nuxt');
  plugins.push('./molle/nuxt-config/pluginSpa.ts');
  scriptObj.push({src: "https://cdnjs.cloudflare.com/ajax/libs/jimp/0.16.1/jimp.js"});
} else {
  plugins.push('./molle/nuxt-config/pluginStatic.ts');
}

export default {
  target: "static",
  ssr: !molle.isMolleCms,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: molle.title,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: molle.description},
      {hid: 'keywords', name: 'keywords', content: molle.keywords},

      {hid: 'og:site_name', property: 'og:site_name', content: molle.siteName},
      {hid: 'og:type', property: 'og:type', content: 'article'},
      {hid: 'og:description', property: 'og:description', content: molle.description},
      {hid: 'og:image', property: 'og:image', content: molle.domain + "og_img.png"},
      {hid: 'og:url', property: 'og:url', content: molle.domain},

      {hid: 'twitter:card', property: 'twitter:card', content: `summary`},
      {hid: 'twitter:image', property: 'twitter:image', content: molle.domain + "og_img.png"},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'preconnect', href: 'https://fonts.gstatic.com',crossOrigin:true},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Audiowide&family=Libre+Barcode+39+Text&family=Noto+Sans+JP:wght@300;400;500;700&family=Righteous&family=Vibur&family=Yesteryear&display=swap'
      },
    ],
    script: scriptObj,
  },
  env: molle,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: css,

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: plugins,
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: modules,
  types: [
    '@types/googlemaps'
  ],
  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false // or `bvCSS`
    , icons: true
  },
  styleResources: {
    scss: [
      '~/assets/scss/variables/_index.scss',
    ]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    filenames: {
      app: ({isDev}) => true ? '[name]-app.js' : '[contenthash].js',
      chunk: ({isDev}) => true ? '[name].js' : '[contenthash].js',
      css: ({isDev}) => true ? '[name].css' : '[contenthash].css',
      img: ({isDev}) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({isDev}) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({isDev}) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    extend(config, ctx) {
      // if (!config.resolve) config.resolve = {}
      // if (!config.resolve.plugins) config.resolve.plugins = []
      // config.resolve.plugins.push(new TsconfigPathsPlugin({configFile: './tsconfig.json'}))

      config.module.rules.forEach((rule) => {
        rule.oneOf && rule.oneOf.forEach((item) => {
          item.use.forEach((loader) => {
            if (/sass-loader/.test(loader.loader)) {
              Object.assign(loader.options, {
                additionalData: envStr
              });
            }
          })
        })
      })
    }
  },
  generate: {
    dir: molle.isMolleCms ? `../functions/${SITE_DIR}` : 'public',
    crawler: false,
    staticAssets: {
      "version": molle.molleProjectID + "/" + molle.molleBrunch
    }
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return {}
    }
  },
  server: {
    // host: "0"
  }
}
