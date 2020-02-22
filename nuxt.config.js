
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      'element-ui/lib/theme-chalk/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '@/plugins/api.js',
      '@/plugins/element-ui',
      // {
      //     src:'@/plugins/element-ui',
      //     ssr:true
      // }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
      '@nuxtjs/axios'
  ],
    axios: {
        proxy: true,
        prefix: '/api/',
        credentials: true
        // See https://github.com/nuxt-community/axios-module#options
    },
    proxy: {
        '/api/': {
            target: 'http://api.ikudou.com',//这个网站是开源的可以请求到数据的
            pathRewrite: {
                '^/api/': '/',
                changeOrigin: true
            }
        }
    },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
