<template>
  <NuxtLink :to="props.path">
    <div class="grid sm:grid-cols-2">
      <div class="bg-zinc-800 p-4">
        <h1 class="text-zinc-50 font-bold text-xl">{{ props.title }}</h1> 
        <p class="mt-2 text-zinc-300">{{ props.description }}</p>
      </div> 

      <div>
        <img 
          :src="props.imgUrl" 
          alt="article-img"
          class="h-full sm:h-56 w-full object-cover"
        >
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string,
  description: string,
  imgUrl: string,
  path: string
}>()

</script>
