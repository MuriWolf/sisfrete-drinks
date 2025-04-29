<script lang="js" setup>
import { onMounted, ref } from 'vue'
import listCategories from '../api/listCategories'
const categories = ref([])
const categorySelected = defineModel('categorySelected')

onMounted(async () => {
  categories.value = await listCategories()
})
</script>

<template>
  <ul>
    <li v-for="category in categories" :key="category">
      <button @click="categorySelected = category.strCategory">
        {{ category.strCategory }}
      </button>
    </li>
  </ul>
</template>
