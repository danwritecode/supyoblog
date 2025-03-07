<template>
  <main class="py-10 px-4">
    <div class="mx-auto max-w-2xl">
      <h1 class="mt-1 text-4xl font-black text-zinc-900">{{ post!.title }}</h1>
      <h1 class="mt-3text-xl text-zinc-700">{{ post!.description }}</h1>
    </div>
    <div class="mt-12 mx-auto max-w-2xl">
      <ContentRenderer v-if="post" :value="post" />
    </div>
  </main>
</template>


<script setup lang="ts">
const route = useRoute()

const { data: post  } = await useAsyncData(() => {
  return queryCollection('content')
    .path(route.path)
    .first()
})

useHead({
  title: post.value!.title,
  meta: [
    // PRIMARY TAGS
    { name: 'description', content: post.value!.description },
    { name: 'title', content: post.value!.title },

    // OPEN GRAPH/FACEBOOK
    { property: 'og:type', content: 'website' },
    // { hid: 'og:url', property: 'og:url', content: config.public.appBase },
    { property: 'og:title', content: post.value!.title },
    // { hid: 'og:image', property: 'og:image', content: post.value!.img },

    // TWITTER
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.value!.title },
    { name: 'twitter:description', content: post.value!.description },
    // { name: 'twitter:image', content: post.value!.img }
  ]
})
</script>
