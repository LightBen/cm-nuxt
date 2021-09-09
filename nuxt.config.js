export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Constantine Minhagim',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'Minhagim constantinois et sefarade d\'Afrique du Nord (Torah, Halakha, Hazanout, Cuisine !). מנהגי קונסטנטין וספרדי צפון אפריקה (תורה, הלכה, חזנות ומתכונים!).'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/style/_variables.scss',
    '~assets/style/bootstrap-snippets.scss',
    '~assets/style/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/main.js', mode: 'client'},
    '@/plugins/flamelink'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules:
    [
      'nuxt-i18n',
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      // https://go.nuxtjs.dev/pwa
      '@nuxtjs/pwa',
      '@nuxtjs/style-resources',
      [
        '@nuxtjs/firebase',
        {
          config: {
            apiKey: process.env.NUXT_ENV_FLAMELINK_API_KEY,
            authDomain: process.env.NUXT_ENV_FLAMELINK_AUTH_DOMAIN,
            databaseURL: process.env.NUXT_ENV_FLAMELINK_DB_URL,
            projectId: process.env.NUXT_ENV_FLAMELINK_PROJECT_ID,
            storageBucket: process.env.NUXT_ENV_FLAMELINK_STORAGE_BUCKET,
            messagingSenderId: process.env.NUXT_ENV_FLAMELINK_MESSAGING_SENDER_ID,
            appId: process.env.NUXT_ENV_FLAMELINK_APP_ID,
            measurementId: process.env.NUXT_ENV_FLAMELINK_MEASUREMENT_ID
          },
          services: {
            auth: true // Just as example. Can be any other service.
          }
        }
      ],
    ],

  styleResources: {
    scss: ['~/assets/scss/*.scss']
  },

  i18n: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Constantine Minhagim',
      display: 'standalone',
      themeColor: '#1294f6',
      msTileColor: '#1294f6',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      workboxPluginMode: 'InjectManifest',
    },
    // workbox: {
    //   importScripts: [
    //       'custom-sw.js'
    //   ],
    // }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: false
  },

  router: {
    base: '/',
    extendRoutes(routes, resolve) {
      routes.push(
        // {
        //   name: "Home",
        //   path: "/",
        //   component: resolve(__dirname, 'pages/index.vue'),
        // },
        {
          name: "Halakha",
          path: "/halakha",
          component: resolve(__dirname, 'pages/category/Halakha.vue'),
        },
        {
          name: 'halakha-url',
          path: '/halakha/:halakha_url',
          component: resolve(__dirname, 'components/PageHalakha.vue'),
          props: true
        },
        {
          path: "/hazanout",
          name: "Hazanout",
          component: resolve(__dirname, 'pages/category/Hazanout.vue'),
        },
        {
          path: '/hazanout/:hazanout_url',
          name: 'hazanout-url',
          component: resolve(__dirname, 'components/PageHazanout.vue'),
          props: true
        },
        {
          path: "/cuisine",
          name: "Cuisine",
          component: resolve(__dirname, 'pages/category/Cuisine.vue'),
        },
        {
          path: '/cuisine/:cuisine_url',
          name: 'cuisine-url',
          component: resolve(__dirname, 'components/PageCuisine.vue'),
          props: true
        },
        {
          path: "/articles",
          name: "Articles",
          component: resolve(__dirname, 'pages/category/Articles.vue'),
        },
        {
          path: '/articles/:articles_url',
          name: 'articles-url',
          component: resolve(__dirname, 'components/PageArticles.vue'),
          props: true
        },
        {
          path: "/siddour",
          name: "Siddour",
          component: resolve(__dirname, 'pages/pages/Siddour.vue'),
          meta: {
            entryId: 'VIao92utBqXEIf5BJ7v3'
          }
        },
        {
          path: "/print",
          name: "Printouts",
          component: resolve(__dirname, 'pages/pages/Printouts.vue'),
          meta: {
            entryId: 'xTDjpC1FBEF5NUxHgVAs'
          }
        },
        {
          path: "/contact",
          name: "Contact",
          component: resolve(__dirname, 'pages/pages/Contact.vue'),
          meta: {
            entryId: 'gEyCCPwRxH7Me3OrQG4S'
          }
        },
        {
          path: "/about",
          name: "About",
          component: resolve(__dirname, 'pages/pages/About.vue'),
          meta: {
            entryId: 'EJPLGthI0WMQ0tlrqPsA'
          }
        },
        {
          path: "/donate",
          name: "Donate",
          component: resolve(__dirname, 'pages/pages/Donate.vue'),
          meta: {
            entryId: 'Wq67TbsRbgWtNjkZdE6T'
          }
        },
        {
          path: "/rabbanim",
          name: "Rabbanim",
          component: resolve(__dirname, 'pages/pages/Rabbanim.vue'),
          meta: {
            entryId: 'l2daIjO7N1UNOfyh04KN'
          }
        },
        {
          path: "/english",
          name: "English",
          component: resolve(__dirname, 'pages/pages/English.vue'),
          meta: {
            entryId: 'JCRJHKAJiBAu49wYynl0'
          }
        },
        {
          path: '/404-not-found',
          name: 'not-found',
          component: resolve(__dirname, 'pages/notFound.vue'),
        },
        {
          path: '*',
          redirect: '/404-not-found',
        }
      )
    }
  }
}
