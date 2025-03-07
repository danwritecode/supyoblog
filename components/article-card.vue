<template>
  <NuxtLink :to="props.path" class="relative group">
    <span class="absolute -left-5 inset-y-0 border-zinc-900 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:border-2"></span>
    <div>
      <div>
        <h1 class="text-zinc-900 font-bold text-xl">{{ props.title }}</h1> 
        <p class="mt-2 text-zinc-600">{{ props.description }}</p>
      </div> 
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string,
  description: string,
  path: string
}>()

</script>
