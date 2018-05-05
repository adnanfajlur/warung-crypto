module.exports = {
  siteMetadata: {
    title: 'Adnan Fajlur',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'AdnanFajlur',
        short_name: 'adnanfajlur',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'minimal-ui',
        icons: [
          {
            src: `/favicons/ndas192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/ndas512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
  ],
};
