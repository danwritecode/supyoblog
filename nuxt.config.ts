export default defineNuxtConfig({
  nitro: {
    preset: 'netlify'
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  content: {
    markdown: {
      anchorLinks: false
    }
    // https://content.nuxtjs.org/api/configuration
  },

  compatibilityDate: '2025-10-21'
})
