export default defineNuxtConfig({
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