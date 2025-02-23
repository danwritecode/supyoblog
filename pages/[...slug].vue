<template>
  <main class="py-10 px-4">
    <div class="mx-auto max-w-2xl">
      <!-- <img :src="data!.img" alt="article image"> -->
      <h1 class="mt-1 text-4xl font-black text-zinc-900">{{ data!.title }}</h1>
      <h1 class="mt-3text-xl text-zinc-700">{{ data!.description }}</h1>
    </div>
    <div class="mt-12 prose mx-auto max-w-2xl">
      <ContentRenderer :value="data!">
        <ContentRendererMarkdown :value="data!" />
      </ContentRenderer>
    </div>
  </main>
</template>


<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData('home', () => queryContent(route.path).findOne())

useHead({
  title: data.value!.title,
  meta: [
    // PRIMARY TAGS
    { hid: 'description', name: 'description', content: data.value!.description },
    { hid: 'title', name: 'title', content: data.value!.title },

    // OPEN GRAPH/FACEBOOK
    { hid: 'og:type', property: 'og:type', content: 'website' },
    // { hid: 'og:url', property: 'og:url', content: config.public.appBase },
    { hid: 'og:title', property: 'og:title', content: data.value!.title },
    { hid: 'og:image', property: 'og:image', content: data.value!.img },

    // TWITTER
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.value!.title },
    { name: 'twitter:description', content: data.value!.description },
    { name: 'twitter:image', content: data.value!.img }
  ]
})
</script>


