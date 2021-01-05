require('dotenv').config();

const env = {
  version: process.env.version,
  breakPoint: process.env.breakPoint,
  gutter: process.env.gutter,
};
let envStr = "";
for (let i in env) {
  envStr += `$${i}:${env[i]};`;
}

export default {
  mode: "universal",
  ssr: true,
  target: "static",
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'sch-ttb-timber-coop',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: '{description}'
      },
      {hid: 'og:site_name', property: 'og:site_name', content: 'sch-ttb-timber-coop'},
      {hid: 'og:type', property: 'og:type', content: 'article'},
      {hid: 'og:image', property: 'og:image', content: `{url}`},

      {hid: 'twitter:card', property: 'twitter:card', content: `summary`},
      {hid: 'twitter:image', property: 'twitter:image', content: `{url}`},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: []
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/Modules.ts',
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@/modules/hook/generate'
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
  server: {
    port: 4000, // デフォルト: 3000
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
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
      config.module.rules.forEach((rule) => {
        rule.oneOf && rule.oneOf.forEach((item) => {
          item.use.forEach((loader) => {
            if (loader.loader === "sass-loader") {
              Object.assign(loader.options, {
                additionalData: envStr
              });
              // console.log(loader.options);
            }
          })
        })
      })
    }
  },
  generate: {
    dir: 'functions/dist'
  }
}
