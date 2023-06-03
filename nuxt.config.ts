export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    markdown: {
      anchorLinks: false
    }
    // https://content.nuxtjs.org/api/configuration
  }
})
