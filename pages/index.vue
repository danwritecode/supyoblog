<template>
  <div class="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl grid grid-cols-1">
      <header class="">
        <h1 class="text-3xl font-black">dan's technoblabber</h1>
        <p class="text-lg text-zinc-700">babbling away about a variety of things</p>
      </header>

      <main class="mt-10 grid grid-cols-1 gap-y-8">
        <ArticleCard 
          v-for="post in posts" 
          :title="post.title!" 
          :description="post.description" 
          :path="post.path!"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData(() => {
  return queryCollection('content')
    .select('title', 'description', 'path', 'id')
    .order('id', 'DESC')
    .all()
})

</script>
