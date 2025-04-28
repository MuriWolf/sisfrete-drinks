<script lang="js" setup>
import { onMounted, ref, watch } from 'vue'
import listCategories from '../api/listCategories'
import filterCocktailsByCategory from '../api/filterCocktailsByCategory'
const categories = ref([])
const categorySelected = ref([])

watch(categorySelected, handleFilterCocktailsByCategory)

onMounted(async () => {
  categories.value = await listCategories()
})

async function handleFilterCocktailsByCategory() {
  if (categorySelected.value != '') {
    const response = await filterCocktailsByCategory(categorySelected.value)
    if (typeof response !== typeof Error) {
      console.log(response)
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="category in categories" v-bind:key="category">
      <button @click="categorySelected = category.strCategory">
        {{ category.strCategory }}
      </button>
    </li>
  </ul>
</template>
