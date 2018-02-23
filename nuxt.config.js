module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  head: {
    title: 'Evrak Takip',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=latin-ext'
      },
      {
        rel: 'stylesheet',
        href: '//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css'
      }
    ]
  },

  plugins: ['~/plugins/buefy', '~/plugins/vuelidate', '~/plugins/axios', '~/plugins/excel', '~/plugins/maskedInput'],

  css: ['~/assets/style.scss'],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'http://10.10.27.36:8181/DTR/v1/',
    credentials: true
  },
  router: {
    linkActiveClass: 'is-active'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
