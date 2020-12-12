export default {
  mode: 'spa',

  head: {
    title: 'CC',
    meta: [
      { charset: 'utf-8' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'
      }
    ]
  },

  plugins: [],

  modules: ['@nuxtjs/axios'],

  buildModules: []
};
