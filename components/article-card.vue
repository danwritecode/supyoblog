<template>
  <NuxtLink :to="props.path" class="relative group">
    <span class="absolute -left-5 inset-y-0 border-zinc-900 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:border-2"></span>
    <div>
      <div>
        <div class="flex items-center gap-x-4">
          <h1 class="text-zinc-900 font-bold text-xl">{{ props.title }}</h1> 
          <span 
            class="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10"
          >
            {{ props.category }}
          </span>
        </div>
        <p class="mt-2 text-zinc-600">{{ props.description }}</p>
      </div> 
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string,
  description: string,
  imgUrl: string,
  path: string,
  category: string,
}>()

</script>
