export default defineNuxtConfig({
  app:{
    head: {
      charset: 'utf-16',
      viewport: 'initial-scale=1',
      title: 'S1 Custom',
      meta: [
        { name: 'description', content: 'Custom Stage1st site.' }
      ],
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
})