export default defineNuxtConfig({
    css: [
      '~/assets/css/tailwind.css',
    ],
    
    ssr: false,
  
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  })