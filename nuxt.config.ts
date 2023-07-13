export default defineNuxtConfig({
  app:{
    head: {
      charset: 'utf-16',
      viewport: 'initial-scale=1',
      title: 'S1 Custom',
      meta: [
        { name: 'description', content: 'Custom Stage1st site.' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://static.saraba1st.com/image/smiley/face2017/068.png' }]
    }
  },
  css: [
    '~/assets/css/tailwind.css',
  ],
  
  ssr: false,
  
  runtimeConfig: {
    public: {
      urlBase: process.env.NUXT_APP_BASE_URL
    }
  },
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  sourcemap: true,
})