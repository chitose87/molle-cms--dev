export default {
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
    //'~/plugins/Modules.ts',
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
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables/_index.scss',
    ]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
