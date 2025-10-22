<template>
  <div class="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl grid grid-cols-1">
      <header class="">
        <h1 class="text-3xl font-black">dan's technoblabber</h1>
        <p class="text-lg text-zinc-700">babbling away about a variety of things</p>
      </header>

      <nav class="mt-10 border-b border-zinc-300">
        <ul class="flex flex-wrap gap-x-6 gap-y-1">
          <li class="flex items-center gap-x-2">
            <button 
              type="button" 
              @click="filter = 'all'" 
              :class="filter === 'all' ? 'underline text-blue-600':'text-blue-600/80 hover:text-blue-700'"
            >
              all
            </button>
          </li>
          <li v-for="category in categories" class="flex items-center gap-x-2">
            <button 
              type="button" 
              @click="filter = category as any"
              :class="filter === category ? 'underline text-blue-600':'text-blue-600/80 hover:text-blue-700'"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </nav>

      <main class="mt-6 grid grid-cols-1 gap-y-8">
        <ArticleCard 
          v-for="article in filteredArticles" 
          :title="article.title!" 
          :description="article.description" 
          :img-url="article.img" 
          :path="article._path!"
          :category="article.category"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('home', () => queryContent('/').sort({_file: -1}).find())

const filter = ref<'all' | 'thoughts' | 'engineering' | 'sci fi'>('all')

const filteredArticles = computed(() => {
  if (filter.value === 'all') return data.value!

  return data.value?.filter(a => a.category.toLowerCase() === filter.value)
})

const categories = computed(() => {
  let unique = new Set()
  data.value?.forEach(a => unique.add(a.category))

  let categories = Array.from(unique)

  return categories
})

</script>
