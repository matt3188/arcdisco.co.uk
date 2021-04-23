const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/style/*.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Gridsome',
  siteDescription: 'A WordPress starter for Gridsome',
  siteUrl: 'https://matt3188.github.io',
  pathPrefix: '/arcdisco.co.uk',

  templates: {
    WordPressCategory: '/category/:slug', // adds a route for the "category" post type (Optional)
    WordPressPost: '/:year/:month/:day/:slug', // adds a route for the "post" post type (Optional)
    WordPressPostTag: '/tag/:slug' // adds a route for the "post_tag" post type (Optional)
  },

  plugins: [
    {
      use: '~/src/plugins/wp-source/',
      options: {
        baseUrl: process.env.WORDPRESS_URL, // required
        typeName: 'WordPress', // GraphQL schema name (Optional)
        perPage: 100, // How many posts to load from server per request (Optional)
        concurrent: 10, // How many requests to run simultaneously (Optional)
        routes: {
          post: '/:year/:month/:day/:slug', //adds route for "post" post type (Optional)
          post_tag: '/tag/:slug' // adds route for "post_tag" post type (Optional)
        },
        createPages: {
          approach: 'include', // include or exclude, default is include
          list: ['functions', 'weddings', 'parties', 'mood-lighting', 'services', 'contact', 'gallery', 'faqs'] //an array of page slugs to include or exclude, ex. ['about', 'our-team'], default is an empty array
        },
        customEndpoints: [
          {
            typeName: "ACF",
            route: '/acf/v2/page/(?P<id>[\\d]+)/?(?P<field>[\\w\\-\\_]+)?',
          }
        ]    
      }
    }
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}
