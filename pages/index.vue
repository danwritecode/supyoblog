<template>
  <div class="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl grid grid-cols-1">
      <header class="">
        <h1 class="text-3xl font-black">dan's technoblabber</h1>
        <p class="text-lg text-zinc-700">babbling away about a variety of things</p>
      </header>

      <main class="mt-10 grid grid-cols-1 gap-y-6">
        <ArticleCard 
          v-for="article in data" 
          :title="article.title!" 
          :description="article.description" 
          :img-url="article.img" 
          :path="article._path!"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('home', () => queryContent('/').sort({_file: -1}).find())

</script>
